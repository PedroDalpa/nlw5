import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repository/SettingsRepository';

class SettingsController {
  async create(request: Request, response: Response) {
    const { username, chat } = request.body;
    console.log(username, chat);

    const settingsRepository = getCustomRepository(SettingsRepository);

    const setting = settingsRepository.create({
      username,
      chat,
    });

    await settingsRepository.save(setting);

    return response.status(201).json(setting);
  }
}

export { SettingsController };
