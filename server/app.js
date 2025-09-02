const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const pokemonRoutes = require('./routes/pokemons');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(`${__dirname}/storage/imgs`));
app.use('/v1', pokemonRoutes);
module.exports = app;