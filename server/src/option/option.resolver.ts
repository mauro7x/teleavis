import { Resolver, Query } from '@nestjs/graphql';
import { OptionService } from './option.service';

@Resolver('Option')
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @Query()
  todo() {
    return 'TODO';
  }
}
