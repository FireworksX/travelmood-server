import WebSocket from 'ws';

export type Callback<T = any> = (data?: T) => void;

class WSSService {
  private wsServer: WebSocket.Server;

  constructor() {
    if (!this.wsServer) {
      this.wsServer = new WebSocket.Server({
        port: 5100,
      });
    }
  }

  onConnection(cb: Callback) {
    this.wsServer.on('connection', cb);
  }

  broadcast(eventName: string, payload?: any) {
    const data = JSON.stringify({ eventName, payload });
    console.log('Broadcast:', eventName, payload);
    this.wsServer.clients.forEach(ws => {
      ws.send(data);
    });
  }
}

export default WSSService;
