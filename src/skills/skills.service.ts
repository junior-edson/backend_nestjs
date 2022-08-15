import { Inject, Injectable } from '@nestjs/common';
import { GetPlayer } from 'src/auth/decorator/get-player.decorator';
import { Player } from 'src/players/player.entity';
import { SkillsRepository } from './repository/implementations/postgres-skills.repository';

@Injectable()
export class SkillsService {
  constructor(
    @Inject('ISkillsRepository')
    private readonly skillsRepository: SkillsRepository,
  ) {}

  async updateAiming(@GetPlayer() player: Player): Promise<any> {
    return this.skillsRepository.updateAiming(player);
  }

  async updateAgility(@GetPlayer() player: Player): Promise<any> {
    return this.skillsRepository.updateAgility(player);
  }

  async updateIntelligence(@GetPlayer() player: Player): Promise<any> {
    return this.skillsRepository.updateIntelligence(player);
  }

  async updateTechnician(@GetPlayer() player: Player): Promise<any> {
    return this.skillsRepository.updateTechnician(player);
  }
}
