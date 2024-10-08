const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');
const fs = require('fs');
const formidable = require('formidable');

const server = http.createServer();
server.on('request', (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id);
        response.setHeader('Content-Type','application/json');
        response.statusCode = 200;
        const serializedJSON = JSON.stringify(metadata);
        response.write(serializedJSON);
        response.end();
        
        
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
    } else if (request.method === 'POST' && parsedUrl.pathname === '/upload') {
        const form = new formidable.IncomingForm({
            uploadDir: __dirname,
            keepExtensions: true,
            multiples: true,
            maxFileSize: 5 * 1024 * 1024,
            filename: (name, ext, part, form) => {
                return (name + ext)
            }
        });
        form.parse(request, (err, fields, files) => {
            if (err) { 
                console.log(err);
                response.statusCode = 500;
                response.end();
            }
            console.log('\n fields:');
            console.log(fields);
            console.log('\n files:');
            console.log(files);
            response.statusCode = 200;
            response.end();
        })
    } else {
        fs.createReadStream('index.html').pipe(response);

        /* Respuesta 404 ante una ruta no conocida
        response.statusCode = 404;
        response.setHeader('X-Powered-By', 'Node');
        response.end();
        */
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