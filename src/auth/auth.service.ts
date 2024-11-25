import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserService } from '../users/_model/users.service';
import { GetByEmailService } from '../users/get-by-email/get-by-email.service';
import { compare } from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { SignUpBodyDto } from './dto/sign-up-body.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { IUser } from 'src/users/_model/users.interface';
import { LoginBodyDto } from './dto/login-body.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getByEmailService: GetByEmailService,
    private readonly usersService: UserService,
  ) {}

  async generateToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
// Nota: Se optó por establecer el rol directamente en el registro para simplificar el flujo,
// dado que el alcance del proyecto no requiere una asignación de roles más compleja.
// En un entorno escalable, sería preferible asignar un rol predeterminado (ej. "user")
// y permitir la modificación de roles a través de un endpoint restringido a administradores
  async signUp(body: SignUpBodyDto): Promise<SignUpResponseDto> {
    try {
      const { email, password } = body;
      const user = await this.getByEmailService.getByEmail(email);
      if (user) {
        throw new ConflictException(
          'There was an issue with your registration.',
        );
      }

      const SALT_OR_ROUNDS = 10;
      const passwordHashed: string = await bcrypt.hash(
        password,
        SALT_OR_ROUNDS,
      );
      const createdUser: IUser = await this.usersService.create({
        ...body,
        password: passwordHashed,
      });
      console.log('createdUser', createdUser);
      return {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      };
    } catch (e) {
      console.error('Error during sign-up:', e);
      throw e;
    }
  }

  async login(body: LoginBodyDto): Promise<LoginResponseDto> {
    try {
      const { password } = body;
      body.email = body.email.toLowerCase();
      const existUser = await this.getByEmailService.getByEmail(body.email);
      if (!existUser) {
        throw new ConflictException('Invalid credentials');
      }
      const user: IUser[] = await this.usersService.find({ email: body.email });
      const checkPassword: boolean = await compare(password, user[0].password);

      if (!checkPassword) {
        throw new ConflictException('Invalid credentials');
      }

      const { firstName, lastName, email, role } = user[0];
      const token_info: TokenPayload = {
        firstName,
        lastName,
        email,
        role,
      };
      const token: string = await this.generateToken(token_info);

      return {
        firstName,
        lastName,
        email,
        token,
      };
    } catch (e) {
      console.error('Error during login:', e);
      throw e;
    }
  }
}
