const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

global.port = 8080
global.provider = new Pact({
    cors: true,
    port: global.port,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    loglevel: 'debug',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    pactfileWriteMode: 'update',
    consumer: 'test-consumer',
    provider: 'test-provide',
    host: '127.0.0.1'
});

process.env.REACT_APP_API_URL = 'http://127.0.0.1'
process.env.REACT_APP_API_PORT = global.port