import { All, Req, BadGatewayException, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @All('/*')
  public async redirectRequest(
    @Req() request: Request
  ): Promise<string> {
    const { originalUrl, method, query, body } = request;

    const recipient = originalUrl.split('/')[1];
    const recipientURL = process.env[recipient];

    return recipientURL
      ? this.appService.redirectRequest(
        recipientURL, originalUrl, method, query ?? {}, body ?? {}
      )
      : new BadGatewayException({ error: 'Cannot process request' });
  }
}
