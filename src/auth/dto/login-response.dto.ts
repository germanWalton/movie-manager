import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'User name' })
  firstName: string;

  @ApiProperty({ description: 'User lastname' })
  lastName: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User access token' })
  token: string;
}
