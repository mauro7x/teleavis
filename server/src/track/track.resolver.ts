import { Resolver, Query } from '@nestjs/graphql';
import { TrackService } from './track.service';

@Resolver('Track')
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query()
  async tracks() {
    return this.trackService.findAll();
  }
}
