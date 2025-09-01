const mongoose = require('mongoose');
mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB');
});
async function connectDb({host, port, dbName}) {
    const uri = `mongodb://${host}:${port}/${dbName}`;
    await mongoose.connect(uri);
}
module.exports = connectDb;