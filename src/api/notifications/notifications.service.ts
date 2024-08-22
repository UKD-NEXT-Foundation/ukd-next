import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma, SessionModel } from '@prisma/client';
import { isJSON } from 'class-validator';
import { v7 as uuidv7 } from 'uuid';
import WebPush from 'web-push';

import { GlobalConfig, GlobalConfigType } from '@app/src/configs';
import { PrismaService } from '@app/src/database/prisma.service';

import { SessionsService } from '../sessions/sessions.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SubscribeNotificationDto } from './dto/subscribe-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  private readonly notifications = this.prismaService.notificationModel;

  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly prismaService: PrismaService,
    private readonly sessionsService: SessionsService,
  ) {
    WebPush.setVapidDetails(
      'mailto:' + this.config.vapidEmail,
      this.config.vapidPublicKey,
      this.config.vapidPrivateKey,
    );
  }

  async create(payload: CreateNotificationDto) {
    await this.sendMessage(payload);
    return this.notifications.create({ data: { ...payload, id: uuidv7() } });
  }

  subscribe(payload: SubscribeNotificationDto, sessionId: string) {
    switch (payload.notificationProvider) {
      case 'WEB_PUSH':
        if (!isJSON(payload.notificationCredentials)) {
          throw new ConflictException('The credentials for the notification must be in the form of a JSON string');
        }
        break;
    }

    return this.sessionsService.update({ id: sessionId, ...payload });
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.findOne(notificationId);

    if (notification.userId !== userId) {
      throw new ConflictException('Only the user who received this message can mark it as read');
    }

    if (notification.readAt) {
      throw new ConflictException('This message has already been marked as read');
    }

    return this.update({ id: notificationId, readAt: new Date() });
  }

  findAll(where?: Prisma.NotificationModelWhereInput) {
    return this.notifications.findMany({ where });
  }

  findOne(id: string) {
    return this.notifications.findUnique({ where: { id } });
  }

  update(payload: UpdateNotificationDto) {
    const { id, ...data } = payload;
    return this.notifications.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.notifications.delete({ where: { id } });
  }

  private async sendMessage(payload: CreateNotificationDto) {
    const sessions = await this.sessionsService.findAll(
      { userId: payload.userId, removedAt: null, NOT: { notificationProvider: null, notificationCredentials: null } },
      { updatedAt: 'desc' },
      false,
    );

    if (!sessions.length) {
      throw new ConflictException('This user does not have a notification subscription available');
    }

    await Promise.all(sessions.map((s) => this.sendByWebPush(s, payload)));
  }

  private async sendByWebPush(session: SessionModel, payload: CreateNotificationDto) {
    switch (session.notificationProvider) {
      case 'WEB_PUSH':
        const jsonPayload = {
          title: payload.title,
          body: payload.message,
          silent: payload.isSilent,
        };
        WebPush.sendNotification(JSON.parse(session.notificationCredentials), JSON.stringify(jsonPayload));
        break;
    }
  }
}
