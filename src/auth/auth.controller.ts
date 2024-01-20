import {
  ConflictException,
  Controller,
  Get,
  Inject,
  NotImplementedException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { GlobalConfig, GlobalConfigType } from '@src/configurations';
import ms from 'ms';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { IGoogleProfile } from './interfaces/google-profile.interface';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  private readonly refreshTokenKeyName = 'refresh_token';

  constructor(
    @Inject(GlobalConfig)
    private readonly config: GlobalConfigType,
    private readonly authService: AuthService,
  ) {}

  @Get('/by/google')
  @UseGuards(GoogleOAuthGuard)
  async authByGoogle() {}

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

  @Post('/by/google')
  @UseGuards(GoogleOAuthGuard)
  async authByGoogleUseCredential() {
    throw new NotImplementedException('Скоро буде, не сии');
  }

  @Get('/refresh')
  async refreshToken(@Req() req: Request) {
    const refreshToken = req.cookies[this.refreshTokenKeyName];

    if (!refreshToken) {
      throw new ConflictException(`"${this.refreshTokenKeyName}" not found with cookie`);
    }

    return this.authService.updateSession(refreshToken);
  }

  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[this.refreshTokenKeyName];

    if (!refreshToken) {
      throw new ConflictException(`"${this.refreshTokenKeyName}" not found with cookie`);
    }

    res.cookie(this.refreshTokenKeyName, '', { maxAge: 0 });
    res.json(await this.authService.removeSession(refreshToken));
  }
}
