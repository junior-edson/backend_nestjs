import { Account } from '../account.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

export interface IAccountsRepository {
  dataSource: any;

  getAccountById(id: string): Promise<Account | null>;
  getAccountByEmail(email: string): Promise<Account | null>;
  createAccount(authCredentialsDto: AuthCredentialsDto): Promise<Account>;
}
