import { Player } from 'src/players/player.entity';

export interface ISkillsRepository {
  dataSource: any;

  updateAiming(player: Player): Promise<any>;
  updateAgility(player: Player): Promise<any>;
  updateIntelligence(player: Player): Promise<any>;
  updateTechnician(player: Player): Promise<any>;
}
