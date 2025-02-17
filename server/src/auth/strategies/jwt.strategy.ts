import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJWTPayload } from '../types/auth-jwtPayload';
import { AuthService } from '../auth.service';

// const options = new Strategy({
//     jwtFromRequest: ,
//     ignoreExpiration :,
//     secretOrKey:
// })

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
    });
  }

  validate(payload: AuthJWTPayload) {
    const userId = payload.sub;
    return this.authService.validateJwtUser(userId);
  }
}
