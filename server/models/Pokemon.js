const mongoose = require ('mongoose');
const schema = mongoose.Schema;
const pokemonSchema = new schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, required: true },
    imageUrl: { type: String, required: true }
}, { timestamps: true });
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;