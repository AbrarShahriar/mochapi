import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ClerkStrategy } from './strategy/clert.strategy';
import { ClerkClientProvider } from './providers/clerk-client.provider';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [ClerkStrategy, ClerkClientProvider, CustomLogger],
  exports: [PassportModule],
})
export class AuthModule {}
