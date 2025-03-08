import { User, verifyToken } from '@clerk/backend';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ClerkClient } from '@clerk/backend';
import { Request } from 'express';
import type { IncomingMessage } from 'http';
import { createClerkRequest } from '@clerk/backend/internal';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async validate(req: Request): Promise<User> {
    const clerkRequest = createClerkRequest(this.incomingMessageToRequest(req));

    try {
      const { isSignedIn, token } = await this.clerkClient.authenticateRequest(
        clerkRequest,
        {
          jwtKey: this.configService.get<string>('CLERK_JWT_KEY'),
          authorizedParties: [
            this.configService.get<string>('CLERK_AUTHORIZED_PARTY'),
          ],
        },
      );

      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      if (isSignedIn) {
        const tokenPayload = await verifyToken(token, {
          secretKey: this.configService.get('CLERK_SECRET_KEY'),
        });

        const user = await this.clerkClient.users.getUser(tokenPayload.sub);
        return user;
      }

      throw new UnauthorizedException('Invalid User');
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
