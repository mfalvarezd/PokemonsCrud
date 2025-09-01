const config = {
    appConfig: {
        port: process.env.APP_PORT || 8080
    },
    dbConfig: {
        port: process.env.DB_PORT || 27017,
        host: process.env.DB_HOST || 'localhost',   
        dbName: process.env.DB_NAME || 'pokemons'
    }
};

module.exports = config;
