import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SessionModel, UserModel } from '@prisma/client';
import { createHash } from 'node:crypto';
import { v7 as uuidv7 } from 'uuid';

import { SessionsService } from '@app/api/sessions/sessions.service';

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthJWTService } from './auth-jwt.service';

@Injectable()
export class AuthSessionsService {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly authJWTService: AuthJWTService,
  ) {}

  async create(user: UserModel, userAgent: string, ipAddress: string) {
    const sessionId = uuidv7();

    const jwtPayload: IJwtPayload = {
      userId: user.id,
      email: user.email,
      sessionId,
    };

    const [refreshToken, accessToken] = await Promise.all([
      this.authJWTService.generateRefreshToken(jwtPayload),
      this.authJWTService.generateAccessToken(jwtPayload),
    ]);

    await this.sessionsService.create({
      refreshTokenHash: this.hashValue(refreshToken),
      notificationCredentials: null,
      notificationProvider: null,
      userId: user.id,
      removedAt: null,
      id: sessionId,
      userAgent,
      ipAddress,
    });

    return { refreshToken, accessToken };
  }

  async update(refreshToken: string) {
    const jwtPayload = await this.authJWTService.verifyRefreshToken(refreshToken);
    const session = await this.sessionsService.findOne(jwtPayload.sessionId);

    this.verifySession(session, refreshToken);

    const [accessToken] = await Promise.all([
      this.authJWTService.generateAccessToken(jwtPayload),
      this.sessionsService.update({ id: jwtPayload.sessionId, updatedAt: new Date() }),
    ]);

    return { accessToken };
  }

  async remove(refreshToken: string) {
    const jwtPayload = await this.authJWTService.verifyRefreshToken(refreshToken);
    const session = await this.sessionsService.findOne(jwtPayload.sessionId);

    this.verifySession(session, refreshToken);

    const deletedSession = await this.sessionsService.update({ id: jwtPayload.sessionId, removedAt: new Date() });

    if (deletedSession) {
      return { statusCode: HttpStatus.OK, message: 'Session successfully deleted' };
    }

    throw new InternalServerErrorException('Could not find a session using the given refreshToken');
  }

  private verifySession(session: SessionModel, refreshToken: string) {
    if (!!session.removedAt && session.removedAt < new Date()) {
      throw new ConflictException('This session was removed');
    }

    if (session.refreshTokenHash !== this.hashValue(refreshToken)) {
      throw new ConflictException('This refresh token is not original');
    }
  }

  private hashValue(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }
}
