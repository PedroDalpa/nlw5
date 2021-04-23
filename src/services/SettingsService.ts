import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../models/Setting';
import { SettingsRepository } from '../repository/SettingsRepository';

interface ISettingsCreate {
  username: string;
  chat: boolean;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  async create({ chat, username }: ISettingsCreate) {
    const userExist = await this.settingsRepository.findOne({
      username,
    });

    if (userExist) {
      throw new Error('user already exists!');
    }

    const setting = this.settingsRepository.create({
      username,
      chat,
    });

    await this.settingsRepository.save(setting);

    return setting;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username,
    });

    return settings;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', {
        username,
      })
      .execute();

    return settings;
  }
}

export { SettingsService };
