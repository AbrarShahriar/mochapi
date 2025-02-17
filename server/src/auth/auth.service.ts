import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon from '@node-rs/argon2';
import { AuthJWTPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshConfiguration: ConfigType<typeof refreshConfig>,
  ) {}

  async signup(createUserDTO: CreateUserDTO) {
    const user = await this.userService.findUserByEmail(createUserDTO.email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    return await this.userService.create(createUserDTO);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');

    const isPasswordMatched = await argon.verify(user.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials');

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(userId: number, email?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      email,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJWTPayload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshConfiguration),
    ]);
    return { accessToken, refreshToken };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id, email: user.email };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    console.log('validateRefreshToken hit');

    const user = await this.userService.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.hashedRefreshToken)
      throw new UnauthorizedException('No refresh token found for user');

    console.log('+++++++++++++++++++++++++++++');
    console.log(user.hashedRefreshToken, refreshToken);
    console.log('+++++++++++++++++++++++++++++');

    const refreshTokenMatched = await argon.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token');

    return { id: user.id };
  }

  async refreshToken(userId: number, email?: string) {
    console.log('Refresh token executing');

    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    console.log('Refresh token executed: ', {
      id: userId,
      email,
      accessToken,
      refreshToken,
    });
    return {
      id: userId,
      email,
      accessToken,
      refreshToken,
    };
  }
  async signOut(userId: number) {
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}
