// src/Pokemons/components/PokemonDetails.jsx
import React from 'react';
import ProgressBar from './ProgressBar';

const PokemonDetails = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: '2rem', width: '400px', borderRadius: '8px' }}>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.imgUrl} alt={pokemon.name} style={{ width: '100%' }} />
        <p><strong>Tipo:</strong> {pokemon.type}</p>
        <p><strong>Nivel:</strong> {pokemon.level}</p>
        <p><strong>Rareza:</strong> {pokemon.rarity}</p>
        <h3>Estadísticas</h3>
        <ProgressBar label="HP" value={pokemon.stats.hp} />
        <ProgressBar label="Ataque" value={pokemon.stats.attack} />
        <ProgressBar label="Defensa" value={pokemon.stats.defense} />
        <br />
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PokemonDetails;
