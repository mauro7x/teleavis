import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from './guards/login.guard';
import { Issuer } from 'openid-client';
import { GetUser } from '~/decorators/get-user.decorator';

@Controller()
export class AuthController {
  @UseGuards(LoginGuard)
  @Get('/login')
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  login() {}

  @Get('/user')
  user(@Request() req) {
    return req.user;
  }

  @UseGuards(LoginGuard)
  @Get('/callback')
  loginCallback(@Request() req, @Res() res: Response, @GetUser() user) {
    if (!user) {
      Logger.warn({
        message: 'No user found in callback call, loging out',
        headers: req.headers,
      });

      res.redirect('/logout');
    }

    Logger.log({
      message: 'Session created',
      user,
    });
    res.redirect('/');
  }

  @Get('/logout')
  async logout(@Request() req, @Res() res: Response, @GetUser() user) {
    const id_token = req.user ? req.user.id_token : undefined;
    req.logout((err: any) => {
      if (err) {
        throw new InternalServerErrorException(err);
      }

      Logger.log({
        message: 'Session destroyed',
        user,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      req.session.destroy(async (error: any) => {
        const TrustIssuer = await Issuer.discover(
          `${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`,
        );
        const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
        if (end_session_endpoint) {
          res.redirect(
            end_session_endpoint +
              '?post_logout_redirect_uri=' +
              process.env
                .OAUTH2_CLIENT_REGISTRATION_LOGIN_POST_LOGOUT_REDIRECT_URI +
              (id_token ? '&id_token_hint=' + id_token : ''),
          );
        } else {
          res.redirect('/');
        }
      });
    });
  }
}
