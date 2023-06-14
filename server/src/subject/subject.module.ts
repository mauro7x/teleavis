import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';

@Module({
  providers: [SubjectResolver, SubjectService],
})
export class SubjectModule {}
