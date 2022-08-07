import { NotFoundException } from '@nestjs/common';
import { PostgresDataSource } from 'src/config/app-data-source';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { GetPlayerFilterDto } from 'src/players/dto/get-player-filter.dto';
import { PlayerStatus } from 'src/players/player-status.enum';
import { Player } from 'src/players/player.entity';
import { IPlayersRepository } from '../players.repository';

export class PlayersRepository implements IPlayersRepository {
  dataSource = PostgresDataSource;

  async getPlayerById(id: string): Promise<Player | null> {
    return this.dataSource.manager.findOneBy(Player, {
      id: id,
    });
  }

  async getCountPlayerByName(name: string): Promise<any> {
    const [player, countPlayer] = await this.dataSource.manager.findAndCountBy(
      Player,
      {
        name: name,
      },
    );

    return countPlayer;
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { name } = createPlayerDto;
    const player: Player = this.dataSource.manager.create(Player, {
      accountId: null,
      skillsId: null,
      classId: null,
      squadId: null,
      name,
      level: 1,
      amountMoney: 1000,
      avatar: '/path/to/img/profile.png',
      inventorySize: 15,
      suspensionTime: null,
      status: PlayerStatus.ACTIVE,
    });

    return this.dataSource.manager.save(player);
  }

  async getPlayers(filterDto: GetPlayerFilterDto): Promise<Player[]> {
    const { status, search } = filterDto;

    const query = this.dataSource
      .getRepository(Player)
      .createQueryBuilder('player');

    if (status) {
      query.andWhere('player.status = :status', { status });
    }

    if (search) {
      query.andWhere('player.name ILIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }

  async deletePlayer(id: string): Promise<void> {
    const result = await this.dataSource.manager.delete(Player, id);

    if (result.affected === 0) {
      throw new NotFoundException(`Player ID "${id}" not found`);
    }
  }

  async updatePlayerStatus(id: string, status: PlayerStatus): Promise<Player> {
    const player: Player = await this.getPlayerById(id);
    player.status = status;
    await this.dataSource.manager.save(player);

    return player;
  }
}
