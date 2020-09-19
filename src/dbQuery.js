const mongoClient = require('./mongoClient');


/**
 * 
 * @param {object} option that contains schema for user retrieval
 */
const getUser = async (dbCollection, option) => {
    try {
        const user = dbCollection.findOne(option);
        return user
    } catch(err) {
        throw err;
    }
}

/**
 * 
 * @param {object} user that came from request body of a registration form
 */
const createUser = async (dbCollection, user) => {
    try {
        await dbCollection.createIndex({email:1}, {unique: true});
        await dbCollection.insertOne(user);
        console.log('saved to database');
    }
    catch(err) {
        throw err
    }
}

/**
 * 
 * @param {object} user query params for mongodb to search for user
 * @param {object} value to be updated into mongodb
 */
const updateUser = async (dbCollection, userQuery, value) => {
    try {
        await dbCollection.updateOne(userQuery, {$set: value})
    } catch(err) {
        throw err;
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser
}
