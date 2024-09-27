const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');

const server = http.createServer();
server.on('request', (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id);
        console.log(metadata);
        console.log(request.headers);
    } else if (request.method === 'POST' && parsedUrl.pathname === '/users') {
        jsonBody(request, response, (err, body) => {
            if (err) {
                console.log(err);
            } else {
            services.createUser(body['username']);
            }
        });
    } else {
        response.statusCode = 404;
        response.setHeader('X-Powered-By', 'Node');
        response.end();
    };
    
    

    /* ## Vanilla JS body parsing ##
    const body = [];
    request.on('data', (chunk) => {
        body.push(chunk);    
    }).on('end', () => {
        const parsedJSON = JSON.parse(Buffer.concat(body));
        const userName = services.createUser(parsedJSON[0]['userName']);
    });
    */
});

server.listen(8080);