import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;
    const userExits = await usersService.findByEmail(email);
    if (!userExits) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });
      user_id = user.id;
    } else {
      const connectionExits = await connectionsService.findByUserId(
        userExits.id
      );

      if (!connectionExits) {
        await connectionsService.create({
          socket_id,
          user_id: userExits.id,
        });
      } else {
        connectionExits.socket_id = socket.id;

        await connectionsService.create(connectionExits);
      }
      user_id = userExits.id;
    }

    await messagesService.create({
      text,
      user_id,
    });
  });
});
