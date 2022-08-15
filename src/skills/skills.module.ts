import { Module } from '@nestjs/common';
import { SkillsRepository } from './repository/implementations/postgres-skills.repository';
import { SkillsService } from './skills.service';

@Module({
  providers: [
    SkillsService,
    { provide: 'ISkillsRepository', useClass: SkillsRepository },
  ],
  exports: [SkillsService],
})
export class SkillsModule {}
