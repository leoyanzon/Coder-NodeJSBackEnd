const config = require('../../config/config');

const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = () => {
    const MONGO_URI = config.db.MONGO_URI;
    return {
        mongoUrl: MONGO_URI,
        ttl: 3600,
        mongoOptions: getMongoConfig(),
        dbName: config.db.DB_NAME
    }
}

module.exports = {
    getMongoConfig,
    getStoreConfig
}