import { NotFoundException } from '@nestjs/common';
import { Account } from 'src/auth/account.entity';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { PostgresDataSource } from 'src/config/app-data-source';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { GetPlayerFilterDto } from 'src/players/dto/get-player-filter.dto';
import { PlayerStatus } from 'src/players/player-status.enum';
import { Player } from 'src/players/player.entity';
import { IPlayersRepository } from '../players.repository';

export class PlayersRepository implements IPlayersRepository {
  dataSource = PostgresDataSource.manager.getRepository(Player);

  async getPlayerById(id: string, account: Account): Promise<Player> {
    return this.dataSource
      .createQueryBuilder('player')
      .where({ id, account })
      .getOne();
  }

  async getCountPlayerByName(name: string): Promise<number> {
    return this.dataSource
      .createQueryBuilder('player')
      .where({ name })
      .getCount();
  }

  async createPlayer(
    createPlayerDto: CreatePlayerDto,
    account: Account,
  ): Promise<Player> {
    const { name } = createPlayerDto;
    const player: Player = this.dataSource.create({
      account,
      name,
      level: 1,
      amountMoney: 1000,
      avatar: '/path/to/img/profile.png',
      inventorySize: 15,
      current_exp: 0,
      suspensionTime: null,
      status: PlayerStatus.ACTIVE,
    });

    return this.dataSource.save(player);
  }

  async getPlayers(
    filterDto: GetPlayerFilterDto,
    @GetAccount() account: Account,
  ): Promise<Player[]> {
    const { status, search } = filterDto;

    const query = this.dataSource.createQueryBuilder('player');

    query.where({ account });

    if (status) {
      query.andWhere('player.status = :status', { status });
    }

    if (search) {
      query.andWhere('player.name ILIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }

  async deletePlayer(id: string, account: Account): Promise<void> {
    const result = await this.dataSource.delete({
      id,
      account,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Player ID "${id}" not found`);
    }
  }

  async updatePlayerStatus(
    id: string,
    status: PlayerStatus,
    account: Account,
  ): Promise<Player> {
    const player: Player = await this.getPlayerById(id, account);
    player.status = status;
    await this.dataSource.manager.save(player);

    return player;
  }
}
