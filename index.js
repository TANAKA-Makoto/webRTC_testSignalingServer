"use strict";

let WebSocketServer = require('ws').Server;
let port = 9000; //ポート番号は必要に応じて変更してください。
let wsServer = new WebSocketServer({ port: port });
console.log('websocket server start. port=' + port);

wsServer.on('connection', function(ws) {
  console.log('-- websocket connected --');
  ws.on('message', function(message) {
    console.log('receive SDP');
    wsServer.clients.forEach(function each(client) {
      if (isSame(ws, client)) {
        console.log('- skip sender -');
      }
      else {
        client.send(message);
        console.log('send SDP=' + message);
      }
    });
  });
});

function isSame(ws1, ws2) {
  // -- compare object --
  return (ws1 === ws2);
}