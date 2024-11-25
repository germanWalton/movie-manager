import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ description: 'User Email' })
  email: string;

  @ApiProperty({ description: 'User name' })
  firstName: string;

  @ApiProperty({ description: 'User lastname' })
  lastName: string;
}
