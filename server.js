require('dotenv').config({silent: true});

let server = require('./app');

let port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('Port: %d', port);
});