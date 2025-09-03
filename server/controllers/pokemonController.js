const Pokemon = require("../models/pokemon");

async function addPokemon(req, res) {
  try {
    let { name, type, level, rarity, stats } = req.body;


    if (typeof stats === "string") {
      try {
        stats = JSON.parse(stats);
      } catch (err) {
        stats = { hp: 0, attack: 0, defense: 0, speed: 0 };
      }
    }

    const pokemon = new Pokemon({
      name,
      type,
      level,
      rarity,
      stats,
    });

    // Manejar imagen
    if (req.file) {
      const { filename } = req.file;
      pokemon.setImgUrl(filename);
    }

    const pokemonAdded = await pokemon.save();
    res.status(201).json({ pokemonAdded });
  } catch (error) {
    console.error("Error al agregar Pokémon:", error);
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
      return res.status(404).json({ success: false, message: "Pokemon not found" });
    }
    res.status(200).json({ success: true, data: pokemon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function updatePokemon(req, res) {
  try {
    const { id } = req.params;
    const { name, type, level, rarity, stats } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (level) updateData.level = level;
    if (rarity) updateData.rarity = rarity;

    if (stats) {
      try {
        updateData.stats = typeof stats === "string" ? JSON.parse(stats) : stats;
      } catch (err) {
        updateData.stats = {};
      }
    }

    // Manejar imagen: guardar URL completa
    if (req.file) {
      const { filename } = req.file;
      const host = `${req.protocol}://${req.get('host')}`;
      updateData.imageUrl = `${host}/public/${filename}`;
    }

    const pokemon = await Pokemon.findByIdAndUpdate(id, updateData, { new: true });
    if (!pokemon) {
      return res.status(404).json({ success: false, message: "Pokemon not found" });
    }

    res.status(200).json({ success: true, data: pokemon });
  } catch (error) {
    console.error("Error al actualizar Pokémon:", error);
    res.status(500).json({ message: error.message });
  }
}


async function deletePokemon(req, res) {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findByIdAndDelete(id);
    if (!pokemon) {
      return res.status(404).json({ success: false, message: "Pokemon not found" });
    }
    res.status(200).json({ success: true, message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addPokemon,
  getPokemons,
  getPokemonById,
  updatePokemon,
  deletePokemon,
};
