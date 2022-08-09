import { Account } from 'src/auth/account.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { PostgresDataSource } from 'src/config/app-data-source';
import { IAccountsRepository } from '../account.repository';
import * as bcrypt from 'bcrypt';

export class AccountsRepository implements IAccountsRepository {
  dataSource = PostgresDataSource.manager.getRepository(Account);

  async getAccountById(id: string): Promise<Account | null> {
    return this.dataSource.findOneBy({
      id: id,
    });
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    return this.dataSource.findOneBy({
      email: email,
    });
  }

  async createAccount(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<Account> {
    const { name, email, password } = authCredentialsDto;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const account: Account = this.dataSource.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.dataSource.save(account);
  }
}
