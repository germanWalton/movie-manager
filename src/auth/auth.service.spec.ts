import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/_model/users.service';
import { GetByEmailService } from '../users/get-by-email/get-by-email.service';
import { ConflictException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { SignUpBodyDto } from './dto/sign-up-body.dto';
import { LoginBodyDto } from './dto/login-body.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { Role } from './enums/role.enum';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
jest.mock('@nestjs/jwt');
jest.mock('../users/get-by-email/get-by-email.service');
jest.mock('../users/_model/users.service');

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let getByEmailService: GetByEmailService;
  let usersService: UserService;
  let bcryptCompare: jest.Mock;
  let bcryptHash: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, GetByEmailService, UserService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    getByEmailService = module.get<GetByEmailService>(GetByEmailService);
    usersService = module.get<UserService>(UserService);
    bcryptCompare = compare as jest.Mock;
    bcryptHash = bcrypt.hash as jest.Mock;
  });

  describe('generateToken', () => {
    it('should return a JWT token', async () => {
      const payload = {
        email: 'test@example.com',
        role: 'admin',
        firstName: 'German',
        lastName: 'Lopez',
      };
      const token = 'jwt_token';

      jwtService.sign = jest.fn().mockReturnValue(token);

      const result = await authService.generateToken(payload);
      expect(result).toBe(token);
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });

  describe('signUp', () => {
    it('should throw ConflictException if user already exists', async () => {
      const body: SignUpBodyDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: Role.Admin,
      };

      getByEmailService.getByEmail = jest
        .fn()
        .mockResolvedValue({ email: 'test@example.com' });

      await expect(authService.signUp(body)).rejects.toThrow(ConflictException);
    });

    it('should create a new user and return user details on successful sign-up', async () => {
      const body: SignUpBodyDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: Role.User,
      };

      getByEmailService.getByEmail = jest.fn().mockResolvedValue(null);
      bcryptHash.mockResolvedValue('hashedPassword');
      usersService.create = jest.fn().mockResolvedValue({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      const result: SignUpResponseDto = await authService.signUp(body);
      expect(result.email).toBe('test@example.com');
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(usersService.create).toHaveBeenCalledWith({
        ...body,
        password: 'hashedPassword',
      });
    });
  });

  describe('login', () => {
    it('should throw ConflictException if user does not exist', async () => {
      const body: LoginBodyDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      getByEmailService.getByEmail = jest.fn().mockResolvedValue(null);

      await expect(authService.login(body)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if password is incorrect', async () => {
      const body: LoginBodyDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      getByEmailService.getByEmail = jest
        .fn()
        .mockResolvedValue({ email: 'test@example.com' });
      usersService.find = jest
        .fn()
        .mockResolvedValue([
          { email: 'test@example.com', password: 'wrongPassword' },
        ]);
      bcryptCompare.mockResolvedValue(false);

      await expect(authService.login(body)).rejects.toThrow(ConflictException);
    });

    it('should return user data and token on successful login', async () => {
      const body: LoginBodyDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashedPassword',
        role: 'admin',
      };
      getByEmailService.getByEmail = jest.fn().mockResolvedValue(user);
      usersService.find = jest.fn().mockResolvedValue([user]);
      bcryptCompare.mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue('jwt_token');

      const result: LoginResponseDto = await authService.login(body);

      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(result.token).toBe('jwt_token');
      expect(jwtService.sign).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        role: 'admin',
      });
    });
  });
});
