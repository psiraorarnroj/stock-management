import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const portfolio = new this.portfolioModel(createPortfolioDto);
    return portfolio.save();
  }

  async findAll(): Promise<Portfolio[]> {
    return this.portfolioModel.find().exec();
  }

  async findById(id: string): Promise<Portfolio> {
    return this.portfolioModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    try {
      const result = await this.portfolioModel
        .findByIdAndUpdate(id, updatePortfolioDto, { new: true })
        .exec();
      if (!result) {
        throw new NotFoundException(`Portfolio with id ${id} not found`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during update');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.portfolioModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Portfolio with id ${id} not found`);
      }
      return { message: 'Delete Successful' };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
