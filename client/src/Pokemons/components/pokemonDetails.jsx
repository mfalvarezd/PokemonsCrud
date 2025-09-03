// src/Pokemons/components/PokemonDetails.jsx
import React from 'react';
import ProgressBar from './ProgressBar';

const PokemonDetails = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const stats = pokemon.stats || { hp: 0, attack: 0, defense: 0, speed: 0 };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // asegúrate que esté por encima de todo
        padding: '1rem',
      }}
      onClick={onClose} // cerrar al hacer click fuera del modal
    >
      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          maxWidth: '100%',
          width: '350px',
          maxHeight: '90%',
          overflowY: 'auto', // scroll si es necesario
          padding: '1.5rem',
          boxSizing: 'border-box',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()} // evita cerrar al click dentro
      >
        <h2>{pokemon.name}</h2>

        {pokemon.imageUrl && (
          <img
            key={pokemon.imageUrl + Date.now()}
            src={`${pokemon.imageUrl}?t=${Date.now()}`}
            alt={pokemon.name}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '200px',
              objectFit: 'contain',
              marginBottom: '1rem',
            }}
          />
        )}

        <p><strong>Tipo:</strong> {pokemon.type}</p>
        <p><strong>Nivel:</strong> {pokemon.level}</p>
        <p><strong>Rareza:</strong> {pokemon.rarity}</p>

        <h3>Estadísticas</h3>
        <ProgressBar label="HP" value={stats.hp} />
        <ProgressBar label="Ataque" value={stats.attack} />
        <ProgressBar label="Defensa" value={stats.defense} />
        <ProgressBar label="Velocidad" value={stats.speed} />

        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PokemonDetails;
