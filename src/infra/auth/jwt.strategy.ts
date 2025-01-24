import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ParsedQs } from 'qs';
import { z } from 'zod';
import { EnvService } from '../env/env.service';
import { GetUserUseCase } from 'src/domain/application/use-cases/user/get-user';

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema> & {
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: EnvService,
    private readonly getUser: GetUserUseCase,
  ) {
    const secret = config.get('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: UserPayload) {
    try {
      const { sub } = tokenPayloadSchema.parse(payload);

      const user = await this.getUser.execute({ userId: sub });

      return user;
    } catch (error: any) {
      throw error;
    }
  }

  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: any,
  ): void {
    super.authenticate(req, options);
  }
}
