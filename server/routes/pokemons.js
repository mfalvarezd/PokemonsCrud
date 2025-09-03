const express = require('express');
const api = express.Router();
const upload = require('../libs/storage');
const { addPokemon,getPokemons,getPokemonById,updatePokemon,deletePokemon } = require('../controllers/pokemonController');

api.post('/pokemons', upload.single('image'), addPokemon);
api.get('/pokemons', getPokemons);
api.get('/pokemons/:id', getPokemonById);
api.put('/pokemons/:id', upload.single('image'), updatePokemon);
api.delete('/pokemons/:id', deletePokemon);

module.exports = api;   