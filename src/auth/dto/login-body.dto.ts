import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
