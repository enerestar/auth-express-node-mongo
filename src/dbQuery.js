const mongoClient = require('./mongoClient');


/**
 * 
 * @param {object} option that contains schema for user retrieval
 */
const getUser = async (option) => {
    try {
        mongoClient.init();
        const collection = await mongoClient.connectToDB();
        const user = collection.findOne(option)
        return user
    } catch(err) {
        res.send(500);
        res.send("Error in querying user!");
    }
}

/**
 * 
 * @param {object} user that came from request body of a registration form
 */
const createUser = async (user) => {
    mongoClient.init();
    try {
        const collection = await mongoClient.connectToDB();
        collection.createIndex({email:1}, {unique: true});
        collection.insertOne(user);
    }
    catch(err) {
        res.send(500);
        res.send("Error in creating user!");
    }
}

/**
 * 
 * @param {object} user query params for mongodb to search for user
 * @param {object} value to be updated into mongodb
 */
const updateUser = async (user, value) => {
    mongoClient.init();
    try {
        const collection = await mongoClient.connectToDB();
        const user = collection.updateOne(user, {$set: value})
    } catch(err) {
        res.send(500);
        res.send("Error in updating user!");
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser
}
