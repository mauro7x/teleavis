import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query()
  pepe() {
    return 'Pepe';
  }

  @Mutation()
  @UseGuards(LocalAuthGuard)
  authenticate() {
    return this.authService.login();
  }
}
