const Pokemon = require('../models/pokemon');

async function addPokemon(req, res) {
    try {
        const {
            name,
            type,
            level
            
        } = req.body;
        

        const pokemon = new Pokemon({
            name,
            type,
            level
        });
        if(req.file){
            const { filename } = req.file;
            pokemon.setImgUrl(filename);
        }

        const pokemonAdded = await pokemon.save();
        res.status(201).json({pokemonAdded});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPokemons(req, res) {
    try {
        const pokemons = await Pokemon.find().lean().exec();
        res.status(200).json({ pokemons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPokemonById(req, res) {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findById(id);
        if (!pokemon) {
            return res.status(404).json({ success: false, message: 'Pokemon not found' });
        }
        res.status(200).json({ success: true, data: pokemon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updatePokemon(req, res) {
    try {
        const { id } = req.params;
        const { name, type, level, imageUrl } = req.body;

        const pokemon = await Pokemon.findByIdAndUpdate(id, {
            name,
            type,
            level,
            imageUrl
        }, { new: true });

        if (!pokemon) {
            return res.status(404).json({ success: false, message: 'Pokemon not found' });
        }

        res.status(200).json({ success: true, data: pokemon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deletePokemon(req, res) {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findByIdAndDelete(id);
        if (!pokemon) {
            return res.status(404).json({ success: false, message: 'Pokemon not found' });
        }
        res.status(200).json({ success: true, message: 'Pokemon deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addPokemon,getPokemons,getPokemonById,updatePokemon,deletePokemon };