/*
 *
 * 
 * Server-related task
 * 
 * 
 * 
 */



// Dependenies
const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const path = require('path');
const config = require('./config');
const handler = require('./handler');


const server = {};

// Keys for the HTTPS server
server.httpServerOptions = {
    key: fs.readFileSync(path.join(__dirname, './../https/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './../https/cert.pem'))
}

// Instantiate the HTTP server
server.httpServer = http.createServer((req, res) => {
        server.unifiedServer(req, res);
});

// Instantiate the HTTPS server
server.httpsServer = https.createServer(server.httpServerOptions, (req, res) =>{
        server.unifiedServer(req, res);
});

// All the logic for both of the servers
server.unifiedServer = ((req, res) => {

    // Get the URL string and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the pathname 
    const path = parsedUrl.pathname;
    const trimmedpath = path.replace(/^\/+|\/+$/g, '');

    // We need to get the query string
    const queryStringObject = parsedUrl.query;

    // Obtain the http method
    const method = req.method;

    // Get the header
    const headers = req.headers;

    // Obtain the payload if there is any
    const decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.end('end', () => {
        buffer += decoder.end();



    // Choose the handler in which the request should go to
    const chosenHandler = typeof(server.router[trimmedpath]) !== undefined ? server.router[trimmedpath] : handler.notFound;

    // Contruct the data object that should go to the handler

    const data = {
        trimmedpath,
        queryStringObject,
        method,
        headers,
        payload: JSON.parse(buffer)
    }

    chosenHandler(data,(statusCode, payload) => {

        // Call the statusCode called by the handler or default to 200
        statusCode = typeof(statusCode) === 'number'? statusCode : 200;

        // Ensure that payload is an object and default to empty object
        payload = typeof(payload) === 'object' ? payload : {};

        // Convert the payload to a string
        const payloadString = JSON.stringify(payload);

        // Send back the response
        res.setHeader('Content-type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        console.log(`Returning this response ${statusCode} ${payloadString}`);

        });

    })


});

// Define a server router

server.router = {
    hello: handler.hello
}


server.init = () => {
    // Start HTTP
    server.httpServer.listen(config.httpPort, () => {
        console.log(`The server is listening on port ${config.httpPort} in ${config.envName} mode`);
    });

    // Start HTTP
    server.httpsServer.listen(config.httpsPort, () => {
        console.log(`The server is listenig on port ${config.httpsPort} in ${config.envName} mode`);
    });

}


// Export the server
module.exports = server;