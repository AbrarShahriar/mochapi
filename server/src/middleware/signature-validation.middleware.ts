import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignatureValidationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers['x-signature'] as string;

    if (!signature) {
      return res.status(400).json({ message: 'Missing signature' });
    }

    // Reconstruct the signed data
    let dataToSign: string;
    console.log('URL', req.originalUrl, req.headers);

    if (req.method === 'GET') {
      dataToSign = req.originalUrl; // Sign the URL for GET requests
    } else {
      dataToSign = JSON.stringify(req.body); // Sign the payload for POST/PATCH/DELETE requests
    }

    // Validate the signature
    const isValid = this.validateSignature(dataToSign, signature);

    if (!isValid) {
      return res.status(403).json({ message: 'Invalid signature' });
    }

    next();
  }

  private validateSignature(data: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.configService.get<string>('SIGNATURE_KEY'))
      .update(data)
      .digest('hex');

    return signature === expectedSignature;
  }
}
