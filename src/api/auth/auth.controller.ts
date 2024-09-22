import {
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import ms from 'ms';

import { GlobalConfig, GlobalConfigType } from '@app/src/configs';

import { AuthByGoogleTokenDto } from './dto/auth-by-google-token.dto';
import { ResponseKeyDto } from './dto/response-key.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { IGoogleProfile } from './interfaces/google-profile.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  private readonly COOKIE_KEY = 'refresh_token';

  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Log in through the Google' })
  @Get('/by/google')
  @UseGuards(GoogleOAuthGuard)
  async byGoogle() {}

  @ApiOperation({ summary: 'Callback to sign in to Google' })
  @Get('/by/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const profile = req.user as IGoogleProfile;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;

    if (!profile) {
      throw new UnauthorizedException('User profile not found');
    }

    const tokens = await this.authService.signInByGoogleToken(profile, userAgent, ipAddress);

    res
      .cookie(this.COOKIE_KEY, tokens.refreshToken, {
        maxAge: ms(this.config.jwtRefreshTokenExpiresIn),
        httpOnly: true,
      })
      .json(tokens);
  }

  @ApiOperation({ summary: 'Sign in with your Google access token' })
  @Post('/by/google')
  async byGoogleToken(@Body() { accessToken }: AuthByGoogleTokenDto, @Req() req: Request, @Res() res: Response) {
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;

    const profile = await this.authService.verifyGoogleToken(accessToken);
    const tokens = await this.authService.signInByGoogleToken(profile, userAgent, ipAddress);

    res
      .cookie(this.COOKIE_KEY, tokens.refreshToken, {
        maxAge: ms(this.config.jwtRefreshTokenExpiresIn),
        httpOnly: true,
      })
      .json(tokens);
  }

  @ApiOperation({ summary: 'Get google client id' })
  @ApiOkResponse({ type: ResponseKeyDto })
  @Get('/google-client-id')
  getGoogleClientId(): ResponseKeyDto {
    return { key: this.config.googleClientId };
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @Get('/refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies[this.COOKIE_KEY];

    if (!refreshToken) {
      throw new ConflictException(`Key: '${this.COOKIE_KEY}' not found in cookie`);
    }

    return this.authService.refresh(refreshToken);
  }

  @ApiOperation({ summary: 'log out of the session' })
  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[this.COOKIE_KEY];
    const funMessage = 'Hi, Mr.Hacker, what are you looking for? :3';

    if (!refreshToken) {
      throw new ConflictException(`Key: '${this.COOKIE_KEY}' not found in cookie`);
    }

    res
      .cookie(this.COOKIE_KEY, funMessage, { maxAge: 0, httpOnly: true })
      .json(await this.authService.logout(refreshToken));
  }
}
