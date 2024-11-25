import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class SignUpBodyDto {
  @ApiProperty({ description: 'User name' })
  firstName: string;

  @ApiProperty({ description: 'User lastname' })
  lastName: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;

  @ApiProperty({ description: 'User role' })
  role: Role;
}
