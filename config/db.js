const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const dbConnect = async () => {

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB Connected');
    } catch (err) {
        console.log('err', err);
        process.exit(1);
    }
}

module.exports = dbConnect;