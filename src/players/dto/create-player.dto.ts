import { IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty({ message: 'You must provide a name for your player' })
  name: string;
}
