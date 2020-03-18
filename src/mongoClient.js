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
    return mongoClient;
}

/**
 * @returns void
 */
const init = async () => {
    try {
        await getMongoClient();
    } catch(err) {
        res.send(500);
        res.send("DB connection error!")
    }
}

/**
 * @returns Promise<MongoClient>
 */
const connectToDB = async () => {
    try {
        const client = await mongoClient.getMongoClient();
        db = client.db('mhcasia');
        const register = db.collection('register');
        return register;
    } catch (err) {
        res.status(500);
        res.send("Oops, seems like something happened on our end!");
    }
}

module.exports = { 
    getMongoClient,
    init,
    connectToDB }
