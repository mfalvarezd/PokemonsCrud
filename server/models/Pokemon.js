const mongoose = require ('mongoose');
const {appConfig} = require ('../config');
const schema = mongoose.Schema;
const pokemonSchema = new schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    stats: {
        hp: { type: Number, default: 0 },
        attack: { type: Number, default: 0 },
        defense: { type: Number, default: 0 },
        speed: { type: Number, default: 0 }
    },
    rarity: {
        type: String,
        enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'],
        default: 'Common'
    }
}, { timestamps: true });

pokemonSchema.methods.setImgUrl = function setImgUrl(filename) {
    const { host, port } = appConfig;
    this.imageUrl = `${host}:${port}/public/${filename}`;
};

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;