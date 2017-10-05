'use strict';

const debug = require('debug')('client');
debug.enabled = true;

function formatNumberLength(num, length) {
  let r = "" + num;
  while (r.length < length) r = "0" + r;
  return r;
}

function startClient(n) {
  const nn = formatNumberLength(n,3);
  //const url = 'http://localhost:3000/?token=abc';
  const url = 'http://localhost:3000/';
  const options = {
    transports: [
      'polling', // default
      'websocket'
    ],
    upgrade: true,
    //path: '/myownpath',
    forceNew: false,
    query: { token: 'cde' },
  };

  const io = require('socket.io-client');
  const socket = io(url, options);

  socket.on('connect', function (data) {
    debug(`[ ] [${nn}] socket.on(connect): io.protocol:`, io.protocol);
    debug(`[ ] socket.on(connect): socket.protocol:`, socket.protocol);
    //console.log(socket);
  });

  socket.on('server-event', function (dataIn) {
    debug(`[<] [${nn}] socket.on(server-event):`, dataIn);
    debug(`[ ] [${nn}] socket.on(server-event): socket.protocol:`, socket.protocol);

    const dataOut = { clientProperty: 'clientValue' };
    socket.emit('client-event', dataOut);
    debug(`[>] [${nn}] socket.emit(server-event):`, dataOut);
  });

  setInterval(() => {
    const dataOut = { clientProperty2: 'clientValue2' };
    socket.emit('client-event', dataOut);
    debug(`[>] [${nn}] socket.emit(server-event):`, dataOut);
  }, 500);

  [
    { event: 'message',           param: 'data'    }, // ?????
    { event: 'connect',                            },
    { event: 'connect_error',     param: 'error'   },
    { event: 'connect_timeout'                     },
    { event: 'error' ,            param: 'error'   },
    { event: 'disconnect' ,       param: 'reason'  },
    { event: 'reconnect',         param: 'attempt' },
    { event: 'reconnect_attempt',                  },
    { event: 'reconnecting',      param: 'attempt' },
    { event: 'reconnect_error',   param: 'error'   },
    { event: 'reconnect_failed'                    },
    { event: 'ping',                               },
    { event: 'pong',              param: 'ms'      },
  ].forEach(function(eventDef) {
    socket.on(eventDef.event, function (data) {
      if (eventDef.param) debug(`[ ] [${nn}] ${eventDef.event}, ${eventDef.param}:`, data);
      else debug(`[ ] [${nn}] ${eventDef.event}`);
    });
  });


}

//function startNext(i,n) {
//  if (i > n) return;
//  console.log('pausing', i)
//}

//if (process.argv[2]) {
console.log(`process.argv[2]: '${process.argv[2]}'`);
let n = (parseInt(process.argv[2]) || 1);
console.log(`n: '${n}'`);
//startNext(1, n);
//}
let i = 1;
setInterval(() => {
  if (i > n) return;
  console.log('starting', i);
  startClient( i++ );
  //startNext(i++);
}, 100);
