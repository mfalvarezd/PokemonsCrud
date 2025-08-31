const config = {
    appConfig: {
        port: process.env.APP_PORT || 8080
    },
    dbConfig: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        dbName: process.env.DB_NAME || 'pokemons'
    }
};

module.exports = config;
