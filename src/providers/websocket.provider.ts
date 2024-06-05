import { Server } from 'socket.io';
import { SignaleLogger } from '@/providers/logger.provider.js';
import { createServer } from 'node:http';

const noop = () => {};

const httpServer = createServer();
const logger = SignaleLogger('Websocket');

const io: Server = new Server(httpServer, {
  cookie: true,
  cors: {
    origin: 'http://localhost:4001',
  },
});

io.on('connection', (socket) => {
  // logger.info('Connected', socket.request.headers);
  socket.join('testing-room');
  // TODO: Verify connection?
  socket.to('testing-room').emit('testing-room', {
    message: 'Hello from room',
  });

  io.emit('testing-custom', {
    message: 'Hello World',
  });

  io.to('testing-room').emit('testing-room', {
    message: 'Hello from room',
  });

  socket.on('hello', noop);
  // useSocketServer(io, {

  //   controllers: [OrderWebsocketController],

  // });
});

httpServer.listen(4002, () => {
  logger.info('Websocket Started');
});

export { httpServer, io };
