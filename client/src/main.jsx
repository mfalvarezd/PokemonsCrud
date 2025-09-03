// src/main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Pokemons/components/layout';
import PokemonTable from './Pokemons/components/pokemonTable';
import PokemonForm from './Pokemons/components/pokemonForm';
import PokemonDetails from './Pokemons/components/pokemonDetails';
import './index.css';

const MainApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddOrUpdate = (pokemon) => {
    setPokemons((prev) => {
      const exists = prev.find(p => p.name === pokemon.name);
      if (exists) {
        return prev.map(p => p.name === pokemon.name ? pokemon : p);
      }
      return [...prev, pokemon];
    });
    setEditingPokemon(null);
  };

  const handleDelete = (pokemon) => {
    setPokemons(pokemons.filter(p => p.name !== pokemon.name));
  };

  return (
    <Layout>
      <div className="header-row">
        <h2>Lista de Pokémons</h2>
        <button onClick={() => setEditingPokemon({})}>Agregar Pokémon</button>
      </div>

      {editingPokemon !== null && (
        <PokemonForm
          editingPokemon={editingPokemon}
          onSubmit={handleAddOrUpdate}
          onCancel={() => setEditingPokemon(null)}
        />
      )}

      {loading ? (
        <div className="loader" />
      ) : (
        <PokemonTable
          pokemons={pokemons}
          onView={setSelectedPokemon}
          onEdit={setEditingPokemon}
          onDelete={handleDelete}
        />
      )}

      <PokemonDetails
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </Layout>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);
