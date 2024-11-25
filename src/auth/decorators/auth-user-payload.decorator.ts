import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthInterfacePayload {
  email: string;
  role: string;
  name: string;
  lastName: string;
  active: boolean;
}

export const UserPayloadAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthInterfacePayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthInterfacePayload;
  },
);
