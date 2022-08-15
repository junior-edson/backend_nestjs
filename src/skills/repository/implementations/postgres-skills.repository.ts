import { PostgresDataSource } from 'src/config/app-data-source';
import { Player } from 'src/players/player.entity';
import { Skill } from 'src/skills/skill.entity';
import { ISkillsRepository } from '../skills.repository';

export class SkillsRepository implements ISkillsRepository {
  dataSource = PostgresDataSource.manager.getRepository(Skill);

  async updateAiming(player: Player): Promise<any> {
    return this.dataSource
      .createQueryBuilder('skills')
      .update(Skill)
      .where({ player })
      .set({
        aiming: () => 'skills.aiming + 1',
        availablePoints: () => 'skills.availablePoints - 1',
      })
      .execute();
  }

  async updateAgility(player: Player): Promise<any> {
    return this.dataSource
      .createQueryBuilder('skills')
      .update(Skill)
      .where({ player })
      .set({
        agility: () => 'skills.agility + 1',
        availablePoints: () => 'skills.availablePoints - 1',
      })
      .execute();
  }

  async updateIntelligence(player: Player): Promise<any> {
    return this.dataSource
      .createQueryBuilder('skills')
      .update(Skill)
      .where({ player })
      .set({
        intelligence: () => 'skills.intelligence + 1',
        availablePoints: () => 'skills.availablePoints - 1',
      })
      .execute();
  }

  async updateTechnician(player: Player): Promise<any> {
    return this.dataSource
      .createQueryBuilder('skills')
      .update(Skill)
      .where({ player })
      .set({
        technician: () => 'skills.technician + 1',
        availablePoints: () => 'skills.availablePoints - 1',
      })
      .execute();
  }
}
