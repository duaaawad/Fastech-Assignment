// to config db 
/*
module.exports = {
    MONGODB_URI: "mongodb+srv://duaaAwad:duaadb123456@cluster0fastech.kz9qv.mongodb.net/flightPass_dev_db?retryWrites=true"
}

process.env.JWT_SECRET = 'secret';*/


//Separte two databases one for development and one for testing purposes
var env = process.env.NODE_ENV || 'development'
console.log('env *****', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb+srv://duaaAwad:duaadb123456@cluster0fastech.kz9qv.mongodb.net/flightPass_dev_db?retryWrites=true";
} else if (env === 'test') {
    console.log('env test')
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb+srv://duaaAwad:duaadb123456@cluster0fastech.kz9qv.mongodb.net/flightPass_test_db?retryWrites=true';
    console.log(process.env.MONGODB_URI)
}

process.env.JWT_SECRET = 'secret';

