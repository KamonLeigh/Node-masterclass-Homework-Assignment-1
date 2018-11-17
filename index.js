/*
 * This assigbment no 1 fo the NODE Masterclass
 * Create simmple API route /hello with welcome message
 * 
 * 
 * 
 * author: Byron Dunkley
 * 
 * 
 * 
 */

 const server = require('./lib/server');


// Declare app
 const app = {}

 app.init = () => {
     // start server
     server.init();
 }

// Start app
app.init()

// Export app
module.exports = app;