import React, { useState } from 'react';
import Header from './header';
import PokemonForm from './pokemonForm';
import PokemonTable from './pokemonTable';
import Modal from './modal';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState(null);

  const handleAddClick = () => {
    setEditingPokemon(null);  // Nueva creación
    setShowForm(true);
  };

  const handleFormSubmit = (pokemon) => {
    if (editingPokemon) {
      setPokemons(pokemons.map(p => (p === editingPokemon ? pokemon : p)));
    } else {
      setPokemons([...pokemons, pokemon]);
    }
    setShowForm(false);
    setEditingPokemon(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPokemon(null);
  };

  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Lista de Pokémons</h3>
          <button onClick={handleAddClick}>Agregar Pokémon</button>
        </div>

        {pokemons.length === 0 ? (
          <div className="empty-state">No hay pokémons disponibles</div>
        ) : (
          <PokemonTable pokemons={pokemons} />
        )}
      </div>

      {showForm && (
        <Modal onClose={handleCancel}>
          <PokemonForm
            onSubmit={handleFormSubmit}
            editingPokemon={editingPokemon}
            onCancel={handleCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default App;
