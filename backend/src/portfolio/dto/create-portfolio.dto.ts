import { IsString, IsNumber } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  readonly stockSymbol: string;
  @IsNumber()
  readonly quantity: number;
  @IsNumber()
  readonly purchasePrice: number;
}
