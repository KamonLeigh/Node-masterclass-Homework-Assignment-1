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
const config = require('./config');
const fs = require('fs');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const path = require('path');


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


});


server.init = () => {
    // Start HTTP
    server.httpServer.listen(config.httpPort, () => {
        console.log('http has started')
    });

    // Start HTTP
    server.httpsServer.listen(config.httpsPort, () => {
        console.log('https has started')
    });


}









// Export the server
module.exports = server;