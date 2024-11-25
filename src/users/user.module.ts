/** @format */

import { Module } from '@nestjs/common';
import { UserSubModule } from './_model/users.module';
import { GetByEmailService } from './get-by-email/get-by-email.service';
import { UserService } from './_model/users.service';

@Module({
  imports: [UserSubModule],
  providers: [GetByEmailService, UserService],
  exports: [GetByEmailService, UserService],
})
export class UserModule {}
