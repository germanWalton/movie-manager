import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.interface';
import { MongooseAdapter } from '../../_config/adapters/mongoose.adapter';

@Injectable()
export class UserService extends MongooseAdapter {
  constructor(@InjectModel('User') protected readonly schema: Model<IUser>) {
    super(schema);
  }
}
