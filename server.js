const http = require('http');
const url = require('url');
const services = require('./services');

const server = http.createServer();
server.on('request', (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id);
        console.log(metadata);
        console.log(request.headers);
    };
    
    const body = [];
    request.on('data', (chunk) => {
        body.push(chunk);    
    }).on('end', () => {
        const parsedJSON = JSON.parse(Buffer.concat(body));
        const userName = services.createUser(parsedJSON[0]['userName']);
    })
});

server.listen(8080);