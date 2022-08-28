import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}

  public async redirectRequest(
    recipientURL: string, originalUrl: string, method: string, query, body
  ): Promise<any> {
    const axiosConfig = {
      method,
      url: `${recipientURL}${originalUrl}`,
      params: query,
      data: body
    };

    return lastValueFrom(
      this.httpService.request(axiosConfig).pipe(
        map(response => response.data),
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status);
        })
      )
    );
  }
}
