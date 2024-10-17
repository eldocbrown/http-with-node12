const https = require('https');

const data = JSON.stringify( {
    userName: 'jcd'
});

const options = {
    hostname: 'localhost',
    port: 443,
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': DataTransfer.length,
        'Authorization': Buffer.from('myUsername' + ':' + 'myPassword').toString('base64')
    }

}

const request = http.request(
    options,
    (response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response.headers);

        response.on('data', (chunk) => {
            console.log('A Chunk: \n');
            console.log(chunk.toString());
        });
    }
);

request.on('error', (err) => {
    console.log(err);
});

request.write(data);

request.end();