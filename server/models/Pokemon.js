const mongoose = require ('mongoose');
const {appConfig} = require ('../config');
const schema = mongoose.Schema;
const pokemonSchema = new schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, required: true },
    imageUrl: { type: String, required: false }
}, { timestamps: true });

pokemonSchema.methods.setImgUrl = function setImgUrl(filename) {
    const { host, port } = appConfig;
    this.imageUrl = `${host}:${port}/public/${filename}`;
};

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;