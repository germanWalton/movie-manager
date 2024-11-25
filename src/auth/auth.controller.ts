import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { HttpStatusInterceptor } from '../interceptors/http-status.interceptor';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../_config/pipes/validation.pipe';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpBodyDto } from './dto/sign-up-body.dto';
import { signUpJoi } from './joi/sign-up.joi';
import { StandardResponseInterceptor } from '../interceptors/standard-response.interceptor';
import { ExceptionFilterAllInterceptor } from '../interceptors/exception-filter-all.interceptor';
import { loginJoi } from './joi/login.joi';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginBodyDto } from './dto/login-body.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(
  HttpStatusInterceptor,
  StandardResponseInterceptor,
  ExceptionFilterAllInterceptor,
)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(new ValidationPipe(signUpJoi))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpBodyDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfuly',
    type: SignUpResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict exception',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request exception.',
  })
  public async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResponseDto> {
    return await this.authService.signUp(body);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginBodyDto })
  @ApiResponse({
    status: 201,
    description: 'Succesfully logged',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict exception',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request exception.',
  })
  @UsePipes(new ValidationPipe(loginJoi))
  public async login(@Body() body: LoginBodyDto): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }
}
