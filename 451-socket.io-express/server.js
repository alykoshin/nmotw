'use strict';

const debug = require('debug')('server');
debug.enabled = true;

function startServer() {
  const app = require('express')();
  const server = require('http').Server(app);
  const options = {
    transports: [
      'polling', // default
      'websocket'
    ]
  };
  const io = require('socket.io')(server, options);

  server.on('listening', () => {
    debug(`[ ] server.address(): ${JSON.stringify(server.address())}`);
  });

  server.on('connection', (socket) =>{
    debug(`[ ] server.on(connection): socket: ${socket.remoteFamily} ${socket.remoteAddress}:${socket.remotePort}`);
  });

  app.get('/', (req, res) => {
    debug(`[ ] app.get(/)`);
    res.sendfile(__dirname + '/index.html');
  });

  //

  // middleware
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    debug('[ ] io.use(): token:', token)
    return next();
    //return next(new Error('authentication error'));
  });

  io.on('connection', (socket) => {
    //console.log(socket)
    debug(`[ ] io.on(connection): socket.id: ${socket.id}`);
    //debug(`io.on(connection): socket.handshake.query: ${JSON.stringify(socket.handshake.query)}`);
    debug(`[ ] io.on(connection): socket.handshake.query.transport: '${socket.handshake.query.transport}'`);
    debug(`[ ] io.on(connection): ${socket.conn.remoteFamily} ${socket.conn.remoteAddress}:${socket.conn.remotePort}`);

    const dataOut = { serverProperty: 'serverValue' };
    debug('[>] server-event: ', dataOut);
    socket.emit('server-event', dataOut);

    socket.on('client-event', function (dataIn) {
      debug(`[<] socket.on(client-event): socket.handshake.query.transport: '${socket.handshake.query.transport}'`);
      debug('socket.on(client-event):', dataIn);
    });
  });

  io.on('disconnecting', (reason) => {
    debug('[ ] io.on(disconnecting): reason:', reason);
  });

  io.on('disconnect', (reason) => {
    debug('[ ] io.on(disconnect): reason:', reason);
  });

  io.on('error', (error) => {
    debug('[ ] io.on(error): error:', error);
  });

  server.listen(3000);

}

startServer();
