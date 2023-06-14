import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';

@Module({
  providers: [TrackResolver, TrackService],
})
export class TrackModule {}
