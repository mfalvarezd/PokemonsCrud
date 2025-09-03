import React, { useState, useEffect } from 'react';

const rarityOptions = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

const initialState = {
  name: '',
  type: '',
  level: 1,
  rarity: 'Common', // default
  imgUrl: '',
  stats: {
    hp: 50,
    attack: 50,
    defense: 50,
  },
};

const PokemonForm = ({ onSubmit, editingPokemon, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editingPokemon) {
      setForm(editingPokemon);
      setImagePreview(editingPokemon.imgUrl || '');
    } else {
      setForm(initialState);
      setImagePreview('');
    }
  }, [editingPokemon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['hp', 'attack', 'defense'].includes(name)) {
      setForm({
        ...form,
        stats: {
          ...form.stats,
          [name]: parseInt(value, 10),
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imgUrl: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialState);
    setImagePreview('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '16px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        margin: '0 auto'
      }}
    >
      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
        {editingPokemon ? 'Editar Pokémon' : 'Agregar Pokémon'}
      </h2>

      {/* Nombre */}
      <label htmlFor="pokemon-name" style={labelStyle}>Nombre</label>
      <input
        id="pokemon-name"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Tipo */}
      <label htmlFor="pokemon-type" style={labelStyle}>Tipo</label>
      <input
        id="pokemon-type"
        name="type"
        placeholder="Tipo"
        value={form.type}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Nivel */}
      <label htmlFor="pokemon-level" style={labelStyle}>Nivel</label>
      <input
        id="pokemon-level"
        name="level"
        type="number"
        placeholder="Nivel"
        value={form.level}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Rareza */}
      <label htmlFor="pokemon-rarity" style={labelStyle}>Rareza</label>
      <select
        id="pokemon-rarity"
        name="rarity"
        value={form.rarity}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        {rarityOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {/* Imagen */}
      <label htmlFor="pokemon-img" style={labelStyle}>Imagen</label>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="pokemon-img" style={fileButtonStyle}>
          Seleccionar imagen
          <input
            id="pokemon-img"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{ width: '100%', height: 'auto', marginTop: '10px', marginBottom: '1rem', borderRadius: '5px' }}
          />
        )}
      </div>

      {/* Stats */}
      <label htmlFor="pokemon-hp" style={labelStyle}>HP</label>
      <input
        id="pokemon-hp"
        name="hp"
        type="number"
        value={form.stats.hp}
        onChange={handleChange}
        style={inputStyle}
      />

      <label htmlFor="pokemon-attack" style={labelStyle}>Ataque</label>
      <input
        id="pokemon-attack"
        name="attack"
        type="number"
        value={form.stats.attack}
        onChange={handleChange}
        style={inputStyle}
      />

      <label htmlFor="pokemon-defense" style={labelStyle}>Defensa</label>
      <input
        id="pokemon-defense"
        name="defense"
        type="number"
        value={form.stats.defense}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Botones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: '#00CFFF' }}
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ ...buttonStyle, backgroundColor: '#ccc', color: '#000' }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PokemonForm;

// Estilos reutilizables
const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '12px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const labelStyle = {
  fontSize: '0.95rem',
  marginBottom: '4px',
  display: 'block',
  fontWeight: 'bold',
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer',
};

const fileButtonStyle = {
  display: 'inline-block',
  padding: '8px 16px',
  backgroundColor: '#00CFFF',
  color: '#fff',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginBottom: '8px',
};
