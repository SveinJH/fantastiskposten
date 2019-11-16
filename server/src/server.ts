const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
const app = require('./app');

const DB : string = 'mongodb://sveinjh:W0yJmJv1BvEbHJ1E@fantastiskposten-shard-00-00-gwcaz.mongodb.net:27017,fantastiskposten-shard-00-01-gwcaz.mongodb.net:27017,fantastiskposten-shard-00-02-gwcaz.mongodb.net:27017/fantastiskposten?ssl=true&replicaSet=fantastiskposten-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connection successful!');
    });

const port: any = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
