/** @format */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { UserSchema } from './users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService],
  exports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserService,
  ],
})
export class UserSubModule {}
