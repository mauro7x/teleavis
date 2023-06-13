import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';

@Module({
  providers: [OptionResolver, OptionService],
})
export class OptionModule {}
