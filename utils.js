//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
to = function(promise) {
    return promise
        .then(data => {
            return [null, data];
        }).catch(err => [pe(err)]);
};
module.exports.to = to;

//parses error so you can read error message and handle them accordingly
pe = require('parse-error');

// TE stands for Throw Error
TE = function(err_message, log) {
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
};
module.exports.TE = TE;

// Error Web Response
ReE = function(res, err, code){
    if(typeof err === 'object' && typeof err.message !== 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json({success:false, error: err});
};
module.exports.ReE = ReE;

// Success Web Response
ReS = function(res, data, code){
    let send_data = {success:true};

    if(typeof data === 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};
module.exports.ReS = ReS;

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});