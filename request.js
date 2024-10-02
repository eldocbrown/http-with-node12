const http = require('http');

const request = http.request(
    { hostname: 'www.google.com' },
    (response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response.headers);

        response.on('data', (chunk) => {
            console.log('A Chunk: \n');
            console.log(chunk.toString());
        });
    }
);

request.end();