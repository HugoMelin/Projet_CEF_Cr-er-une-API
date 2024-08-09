const mongoose = require('mongoose');

const clientOption = {
    userNewUrlParser : true,
    dbName : 'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOption);
        console.log('Connected');
    } catch (e) {
        console.log(e);
        throw e;
    }
};