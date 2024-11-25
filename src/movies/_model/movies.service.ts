import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovie } from './movies.interface';
import { MongooseAdapter } from '../../_config/adapters/mongoose.adapter';

@Injectable()
export class MovieService extends MongooseAdapter {
  constructor(@InjectModel('Movie') protected readonly schema: Model<IMovie>) {
    super(schema);
  }
}
