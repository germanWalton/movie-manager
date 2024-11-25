// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ENVIRONMENT } from '../../_config/constants/environment.constant';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: ENVIRONMENT(configService).JWT_SECRET,
//     });
//   }

//   async validate(payload: any) {
//     return payload;
//   }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENVIRONMENT } from '../../_config/constants/environment.constant';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENVIRONMENT.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload) {
    return payload;
  }
}
export interface JwtPayload extends TokenPayload {
  iat: number;
  exp: number;
}
