const dotenv = require('dotenv');
const {MongoClient} = require("mongodb");

dotenv.config();

const connectDB = async () => {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.MONGODB_URI);
        await mongoClient.connect();
        return mongoClient;
    } catch (error) {
        console.error(error);
        throw 'Connection to MongoDB Atlas failed!'+ error;
    }
};

module.exports = connectDB;