import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repository/UsersRepository';

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    const userExits = await this.usersRepository.findOne({
      email,
    });

    if (userExits) {
      return userExits;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersService };
