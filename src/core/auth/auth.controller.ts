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
import { Request, Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalConfig, GlobalConfigType } from '@app/src/configs';
import ms from 'ms';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { IGoogleProfile } from './interfaces/google-profile.interface';
import { AuthByGoogleTokenDto } from './dto/auth-by-google-token.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  private readonly refreshTokenKeyName = 'refresh_token';

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
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const profile = req.user as IGoogleProfile;
    const userAgent = req.headers['user-agent'];

    if (!profile) {
      throw new UnauthorizedException('User profile not found');
    }

    const tokens = await this.authService.signInByGoogle(profile, userAgent);

    res.cookie(this.refreshTokenKeyName, tokens.refreshToken, {
      maxAge: ms(this.config.jwtRefreshTokenExpiresIn),
      httpOnly: true,
    });
    res.json(tokens);
  }

  @ApiOperation({ summary: 'Sign in with your Google access token' })
  @Post('/by/google')
  async byGoogleToken(@Req() req: Request, @Body() payload: AuthByGoogleTokenDto, @Res() res: Response) {
    const accessToken = payload.accessToken;
    const userAgent = req.headers['user-agent'];

    const profile = await this.authService.verifyGoogleToken(accessToken);
    const tokens = await this.authService.signInByGoogle(profile, userAgent);

    res.cookie(this.refreshTokenKeyName, tokens.refreshToken, {
      maxAge: ms(this.config.jwtRefreshTokenExpiresIn),
      httpOnly: true,
    });
    res.json(tokens);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @Get('/refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies[this.refreshTokenKeyName];

    if (!refreshToken) {
      throw new ConflictException(`"${this.refreshTokenKeyName}" not found with cookie`);
    }

    return this.authService.updateSession(refreshToken);
  }

  @ApiOperation({ summary: 'log out of the session' })
  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[this.refreshTokenKeyName];

    if (!refreshToken) {
      throw new ConflictException(`"${this.refreshTokenKeyName}" not found with cookie`);
    }

    res.cookie(this.refreshTokenKeyName, '', { maxAge: 0, httpOnly: true });
    res.json(await this.authService.removeSession(refreshToken));
  }
}
