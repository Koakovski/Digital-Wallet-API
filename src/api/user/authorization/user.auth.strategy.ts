import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { AuthenticatedUserPayload } from 'src/domain/usecases/user/user.login.usecase';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/domain/services/config.service';

@Injectable()
export class UserAuthEstrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: AuthenticatedUserPayload) {
    const fetchedUser = await this.userRepository.findByEmail(payload.email);
    if (!fetchedUser) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
