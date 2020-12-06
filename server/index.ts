import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server, Socket } from 'socket.io';
import { WEBSOCKET_EVENTS } from '../constants';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  const io = new Server(server);

  io.on('connection', (socket: Socket) => {
    const searchParams = new URLSearchParams(socket.request.url.split('?')[1]);
    const boardName = searchParams.get('boardName');

    if (boardName) socket.join(boardName);

    WEBSOCKET_EVENTS.forEach((event) => {
      socket.on(event.name, (message) => {
        if (boardName) {
          socket.to(boardName).broadcast.emit(event.name, message);
        }
      });
    });
  });

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  );
});
