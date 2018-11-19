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
    if(data.method === 'post'){
    
        handlers._hello.put(data,callback)

    } else {
        callback(406);
    }

};

handlers._hello.put = (data, callback) => {
    
    const name = typeof(data.payload.name) === 'string' && payload.name.trim().length > 0 ? payload.name.trim() : false;

    if(name){
        callback(200, `Hello ${name}! How are you doing?`)
    } else {
        callback(406)
    }

}
 


 module.exports = handlers;