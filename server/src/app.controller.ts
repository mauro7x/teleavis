import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(@Request() req): string {
    if (req.user) {
      return (
        'Hello, ' + req.user.userinfo.name + '! <a href="/logout">Logout</a>'
      );
    } else {
      return 'Hello, to continue please login!' + ' <a href="/login">Login</a>';
    }
  }
}
