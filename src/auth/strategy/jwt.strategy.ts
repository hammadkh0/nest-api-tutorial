import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    // eslint-disable-next-line prettier/prettier
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: payload.sub,
      },
    });
    if (user && user.hash) {
      user.hash = null;
    }

    return user;
  }
}
