import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayerFilterDto } from './dto/get-player-filter.dto';
import { PlayerStatus } from './player-status.enum';
import { Player } from './player.entity';
import { IPlayersRepository } from './repository/players.repository';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('IPlayersRepository')
    private readonly playersRepository: IPlayersRepository,
  ) {}

  async getPlayerById(id: string): Promise<Player | null> {
    const player: Player = await this.playersRepository.getPlayerById(id);

    if (!player) {
      throw new NotFoundException(`Player ID "${id}" not found`);
    }

    return player;
  }

  async getCountPlayerByName(name: string): Promise<any> {
    return this.playersRepository.getCountPlayerByName(name);
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { name } = createPlayerDto;
    const foundPlayer: Player = await this.getCountPlayerByName(name);

    if (!foundPlayer) {
      return this.playersRepository.createPlayer(createPlayerDto);
    } else {
      throw new ConflictException(`Player name "${name}" already exists`);
    }
  }

  async getPlayers(filterDto: GetPlayerFilterDto): Promise<Player[]> {
    return this.playersRepository.getPlayers(filterDto);
  }

  async deletePlayer(id: string): Promise<void> {
    return this.playersRepository.deletePlayer(id);
  }

  async updatePlayerStatus(id: string, status: PlayerStatus): Promise<Player> {
    return this.playersRepository.updatePlayerStatus(id, status);
  }
}
