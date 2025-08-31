const mongoose = require('mongoose');

async function connectToDatabase({host, port, dbName}) {
    const uri = `mongodb://${host}:${port}/${dbName}`;
    await mongoose.connect(uri);
}
module.exports = connectToDatabase;