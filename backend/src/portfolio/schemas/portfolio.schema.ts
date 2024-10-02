import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {
  @Prop({ required: true })
  stockSymbol: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  purchasePrice: number;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
