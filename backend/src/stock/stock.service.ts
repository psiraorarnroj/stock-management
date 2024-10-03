import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class StockService {
  private apiUrl: string;
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('STOCK_API_URL');
    this.apiKey = this.configService.get<string>('STOCK_API_KEY');
  }

  async findAll(): Promise<Observable<AxiosResponse<any, any>>> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.apiUrl}/symbol/NASDAQ`, {
          params: { apikey: this.apiKey },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(
              `An error occurred during get stock list: ${error.message}`,
            );
          }),
        ),
    );
    return data;
  }
}
