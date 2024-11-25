/** @format */

import { Injectable } from '@nestjs/common';
import { UserService } from '../_model/users.service';

@Injectable()
export class GetByEmailService {
  constructor(private userService: UserService) {}
  async getByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.userService.find({
        email,
      });
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }
}
