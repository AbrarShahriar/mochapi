import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { AuthJWTPayload } from '../types/auth-jwtPayload';
import { AuthService } from '../auth.service';
import refreshConfig from '../config/refresh.config';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfiguration: ConfigType<typeof refreshConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: refreshTokenConfiguration.secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthJWTPayload) {
    console.log('Guard hit');

    const userId = payload.sub;
    const refreshToken = (req.body as any).refresh;
    console.log('Guard payload', payload);

    console.log(
      'calling',
      `this.authService.validateRefreshToken(${userId}, ${refreshToken})`,
    );

    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
