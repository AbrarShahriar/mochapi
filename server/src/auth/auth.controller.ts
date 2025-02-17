import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDTO: CreateUserDTO) {
    console.log(2);

    return this.authService.signup(createUserDTO);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req) {
    return this.authService.login(req.user.id, req.user.email);
  }

  @Post('/signout')
  async signout(@Req() req) {
    return this.authService.signOut(req.user.id);
  }

  @Get('/profile')
  async getUserProfile(@Req() req) {
    return { id: req.user.id, email: req.user.email };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req) {
    console.log('Refresh path hit');
    console.log(
      'calling',
      `this.authService.refreshToken(${req.user.id}, ${req.user.email})`,
    );

    return this.authService.refreshToken(req.user.id, req.user.email);
  }
}
