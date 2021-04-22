import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../models/Message';
import { MessageRepository } from '../repository/MessagesRepository';

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessageRepository);
  }

  async create({ user_id, text, admin_id }: IMessageCreate) {
    const message = this.messagesRepository.create({
      user_id,
      text,
      admin_id,
    });

    await this.messagesRepository.save(message);

    return message;
  }
  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user'],
    });

    return list;
  }
}

export { MessagesService };
