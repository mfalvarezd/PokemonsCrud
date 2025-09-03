import React from 'react';

const PokemonTable = ({ pokemons, onView, onEdit, onDelete }) => {
  if (!pokemons.length) {
    return (
      <div className="empty-state">
        <p>No hay pokémons disponibles</p>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Nivel</th>
          <th>Rareza</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon, index) => (
          <tr key={index}>
            <td>{pokemon.name}</td>
            <td>{pokemon.type}</td>
            <td>{pokemon.level}</td>
            <td>{pokemon.rarity}</td>
            <td>
              <button onClick={() => onView(pokemon)}>Ver</button>
              <button onClick={() => onEdit(pokemon)}>Editar</button>
              <button onClick={() => onDelete(pokemon)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokemonTable;
