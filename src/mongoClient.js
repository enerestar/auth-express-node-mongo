const MongoClient = require('mongodb');
const config = require('./config');

let mongoClient = null;

/**
 * @returns Promise<MongoClient>
 */
const getMongoClient = async () => {
    if (mongoClient === null) {
        mongoClient = new MongoClient.MongoClient(config.mongoConfig.url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }).connect();
    }
    return await mongoClient;
}

/**
 * @returns Promise<MongoClient>
 */
const connectToDB = async () => {
    try {
        const client = await getMongoClient();
        db = client.db('mhcasia');
        const register = db.collection('register');
        return register;
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    getMongoClient,
    connectToDB,
}
