const mongoDB = require("../utils/mongoDB");
const objectID = require("mongodb").ObjectId;
const bcrypt = require('bcryptjs');

const saveUser = async (username, password, userType) => {
    let mongoClient;

    try {
        mongoClient = mongoDB();
        const db = (await mongoClient).db("syncIoT");
        const users = db.collection("users");

        const salt = await bcrypt.genSalt(10);
        const user = {
            username: username,
            password: await bcrypt.hash(password, salt),
            userType: userType,
        }

        const result = await users.insertOne(user);
        return result.insertedId;
    } catch (e) {
        throw "Error saving user to mongo: " + e;
    }
}

const findUserById = async (id) => {
    let mongoClient;

    try {
        mongoClient = mongoDB();
        const db = (await mongoClient).db("syncIoT");
        const users = db.collection("users");

        const processedID = new objectID(id);
        const query = {_id: processedID}
        return await users.findOne(query);
    } catch (e) {
        throw "Error verifying user from mongo: " + e;
    }
}

const findUserByUsername = async (username) => {
    let mongoClient;

    try {
        mongoClient = mongoDB();
        const db = (await mongoClient).db("syncIoT");
        const users = db.collection("users");

        const query = {username: username}
        return await users.findOne(query);
    } catch (e) {
        throw "Error verifying user from mongo: " + e;
    }
}

module.exports = {saveUser, findUserById, findUserByUsername}