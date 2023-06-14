import { Resolver, Query, Args } from '@nestjs/graphql';
import { SubjectService } from './subject.service';

@Resolver('Subject')
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Query()
  async subjects(@Args('trackId') trackId: string) {
    return trackId
      ? this.subjectService.findAllByTrack(trackId)
      : this.subjectService.findAll();
  }
}
