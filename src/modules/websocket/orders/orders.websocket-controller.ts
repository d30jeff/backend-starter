import {
  EmitOnFail,
  EmitOnSuccess,
  OnConnect,
  OnDisconnect,
  OnMessage,
  SocketController,
  SocketIO,
} from 'socket-controllers';
import { Socket } from 'socket.io';

@SocketController('/')
export class OrderWebsocketController {
  @OnConnect()
  connect(@SocketIO() io: Socket) {
    console.log('Orders Connected');
    // io.emit('testing', 'Hello World');
    return {
      hello: 'testing',
    };
  }

  @OnDisconnect()
  disconnect() {
    console.log('Disconnect');
  }

  @OnMessage('save')
  @EmitOnSuccess('save_successfully')
  @EmitOnFail('save_error')
  save() {
    return {
      id: 1,
      text: 'new message',
    };
  }
}
