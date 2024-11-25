import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpBodyDto } from './dto/sign-up-body.dto';
import { LoginBodyDto } from './dto/login-body.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Role } from './enums/role.enum';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should successfully register a user', async () => {
      const signUpDto: SignUpBodyDto = {
        email: 'testuser@gmail.com',
        password: 'password123',
        firstName: 'jUAN',
        lastName: 'Doe',
        role: Role.Admin,
      };
      const result: SignUpResponseDto = {
        email: 'testuser@gmail.com',
        firstName: 'jUAN',
        lastName: 'Doe',
      };

      mockAuthService.signUp.mockResolvedValue(result);

      expect(await authController.signUp(signUpDto)).toEqual(result);
      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
    });

    it('should throw a conflict exception if user already exists', async () => {
      const signUpDto: SignUpBodyDto = {
        email: 'testuser@gmail.com',
        password: 'password123',
        firstName: 'jUAN',
        lastName: 'Doe',
        role: Role.Admin,
      };

      mockAuthService.signUp.mockRejectedValue(
        new ConflictException('User already exists'),
      );

      try {
        await authController.signUp(signUpDto);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.response.message).toBe('User already exists');
      }
    });

    it('should throw a bad request exception for invalid data', async () => {
      const signUpDto: SignUpBodyDto = {
        email: '',
        password: '',
        firstName: 'jUAN',
        lastName: 'Doe',
        role: Role.Admin,
      };

      mockAuthService.signUp.mockRejectedValue(
        new BadRequestException('Invalid data'),
      );

      try {
        await authController.signUp(signUpDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toBe('Invalid data');
      }
    });
  });

  describe('login', () => {
    it('should successfully log in a user', async () => {
      const loginDto: LoginBodyDto = {
        email: 'testuser',
        password: 'password123',
      };
      const result: LoginResponseDto = {
        token: 'some-jwt-token',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw a conflict exception if credentials are incorrect', async () => {
      const loginDto: LoginBodyDto = {
        email: 'wronguser@gmail.com',
        password: 'wrongpassword',
      };

      mockAuthService.login.mockRejectedValue(
        new ConflictException('Invalid credentials'),
      );

      try {
        await authController.login(loginDto);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.response.message).toBe('Invalid credentials');
      }
    });

    it('should throw a bad request exception for invalid data', async () => {
      const loginDto: LoginBodyDto = { email: '', password: '' };

      mockAuthService.login.mockRejectedValue(
        new BadRequestException('Invalid data'),
      );

      try {
        await authController.login(loginDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toBe('Invalid data');
      }
    });
  });
});
