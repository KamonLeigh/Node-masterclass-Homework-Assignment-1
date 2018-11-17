/*
 *
 * Request handlers
 * 
 * 
 */


 const handlers = {};


//ping handler
handlers.ping = (data, callback) => {
    callback(200);
}


// path not found
handlers.notFound = (data, callback) => {
    callback(404);
};

handlers.hello = (data, callback) => {

};
 


 module.exports = handlers;