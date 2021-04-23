import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import './database';
import { routes } from './routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (request, response) => {
  return response.render('html/client.html');
});

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo ws

io.on('connect', (socket: Socket) => {});

app.use(express.json());
// app.use(cors());
app.use(routes);

export { http, io };
