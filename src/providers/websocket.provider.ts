import { createServer } from 'http';
import { SignaleLogger } from '@providers/logger.provider';
import { Server } from 'socket.io';

const httpServer = createServer();
const logger = SignaleLogger('Websocket');

const io = new Server(httpServer, {
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

  socket.on('hello', () => {});
  // useSocketServer(io, {
  //   controllers: [OrderWebsocketController],
  // });
});

httpServer.listen(4002, () => {
  logger.info('Websocket Started');
});

export { httpServer, io };
