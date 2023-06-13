import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CredentialsInput, Session } from '~/types/graphql';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser({ username, password }: CredentialsInput): Promise<any> {
    const validUsername = this.configService.get<string>('AUTH_USER');
    const validPass = this.configService.get<string>('AUTH_PASS');

    return username === validUsername && password === validPass ? {} : null;
  }

  async login(): Promise<Session> {
    return {
      accessToken: this.jwtService.sign({}),
    };
  }
}
