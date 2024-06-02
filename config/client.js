const mongoose = require('mongoose');


mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const connection = mongoose.connection


module.exports = {
    connection,
    client: connection.getClient()
}