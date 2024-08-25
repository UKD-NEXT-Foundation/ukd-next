import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles, SessionId, User } from '@app/common/decorators';
import { UserRole } from '@app/common/enums';
import { AuthGuard, RolesGuard } from '@app/common/guards';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

import { SessionResponseDto } from '../sessions/dto/session-response.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { SubscribeNotificationDto } from './dto/subscribe-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiBearerAuth()
@ApiTags('Notifications')
@UseGuards(AuthGuard, RolesGuard)
@Controller('/notifications')
export class NotificationsController {
  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly notificationsService: NotificationsService,
  ) {}

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.CREATED })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Post()
  create(@Body() payload: CreateNotificationDto) {
    return this.notificationsService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: SessionResponseDto, status: HttpStatus.OK })
  @Post('/subscribe')
  subscribe(@Body() payload: SubscribeNotificationDto, @SessionId() sessionId: string) {
    return this.notificationsService.subscribe(payload, sessionId);
  }

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.OK, isArray: true })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.OK, isArray: true })
  @Get('/personal')
  findPersonal(@User('id') userId: string) {
    return this.notificationsService.findAll({ userId });
  }

  @Get('/vapid-public-key')
  findVapidPublicKey() {
    return { vapidPublicKey: this.config.vapidPublicKey };
  }

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.OK })
  @Get('/markp-as-read/:id')
  markAsRead(@Param('id', ParseUUIDPipe) notificationId: string, @User('id') userId: string) {
    return this.notificationsService.markAsRead(notificationId, userId);
  }

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.findOne(id);
  }

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Patch()
  update(@Body() payload: UpdateNotificationDto) {
    return this.notificationsService.update(payload);
  }

  @ApiResponse({ type: NotificationResponseDto, status: HttpStatus.OK })
  @Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.remove(id);
  }
}
