/*
 *
 * Request handlers
 * 
 * 
 */


 const handlers = {};
 
 // handle methods
 handlers._hello = {};

//ping handler
handlers.ping = (data, callback) => {
    callback(200);
}


// path not found
handlers.notFound = (data, callback) => {
    callback(404);
};

handlers.hello = (data, callback) => {
    if(data.method === 'post'){
    
        handlers[data.method].put(data,callback)

    } else {
        callback(406);
    }

};

handlers._hello.put = (data, callback) => {
    
    const name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;

    if(name){
        callback(200, `Hello ${name}! How are you doing?`)
    } else {
        callback(406)
    }

}
 


 module.exports = handlers;