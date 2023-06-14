import { Resolver, Query } from '@nestjs/graphql';
import { OptionService } from './option.service';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '~/auth/guards/authenticated.guard';

@Resolver('Option')
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @UseGuards(AuthenticatedGuard)
  @Query()
  private() {
    return 'private';
  }

  @Query()
  public() {
    return 'public';
  }
}
