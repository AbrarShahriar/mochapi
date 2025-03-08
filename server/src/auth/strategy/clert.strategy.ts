import { createClerkClient, User } from '@clerk/backend';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ClerkClient } from '@clerk/backend';
import { Request } from 'express';
import type { IncomingMessage } from 'http';
import { createClerkRequest } from '@clerk/backend/internal';
import { CustomLogger } from 'src/logger/logger.service';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly configService: ConfigService,
    private readonly logger: CustomLogger,
  ) {
    clerkClient = createClerkClient({
      secretKey: configService.get<string>('CLERK_SECRET_KEY'),
      publishableKey: configService.get<string>('CLERK_PUBLISHABLE_KEY'),
    });
    super();
  }

  async validate(req: Request): Promise<User> {
    const clerkRequest = createClerkRequest(this.incomingMessageToRequest(req));

    try {
      let user: User | null = null;
      const { isSignedIn, toAuth } = await this.clerkClient.authenticateRequest(
        clerkRequest,
        {
          jwtKey: this.configService.get<string>('CLERK_JWT_KEY'),
          authorizedParties: [
            this.configService.get<string>('CLERK_AUTHORIZED_PARTY'),
          ],
        },
      );

      const u = toAuth().userId;
      const a = await this.clerkClient.users.getUser(u);
      this.logger.log(`userId: ${u}`);
      this.logger.log(`user: ${JSON.stringify(a)}`);

      if (!isSignedIn) {
        throw new UnauthorizedException('Not signed in');
      }

      const { userId } = toAuth();
      user = await this.clerkClient.users.getUser(userId);

      if (!user) {
        throw new UnauthorizedException('Invalid User');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private incomingMessageToRequest(req: IncomingMessage) {
    const headers = Object.keys(req.headers).reduce(
      (acc, key) => Object.assign(acc, { [key]: req?.headers[key] }),
      {},
    );
    // @ts-expect-error Optimistic attempt to get the protocol in case
    // req extends IncomingMessage in a useful way. No guarantee
    // it'll work.
    const protocol = req.connection?.encrypted ? 'https' : 'http';
    const dummyOriginReqUrl = new URL(
      req.url || '',
      `${protocol}://clerk-dummy`,
    );
    return new Request(dummyOriginReqUrl, {
      method: req.method,
      headers: new Headers(headers),
    });
  }
}
