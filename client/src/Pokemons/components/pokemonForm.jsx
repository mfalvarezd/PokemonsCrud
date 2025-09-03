import React, { useState, useEffect } from 'react';

const rarityOptions = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

const initialState = {
  name: '',
  type: '',
  level: 1,
  rarity: 'Common', // default
  image: null, // ⭐ CAMBIADO: ahora es File object, no string
  stats: {
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
  },
};

const PokemonForm = ({ onSubmit, editingPokemon, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editingPokemon) {
      console.log("=== EDITANDO POKEMON ===");
      console.log("Pokemon a editar:", editingPokemon);
      
      setForm({
        ...editingPokemon,
        image: null, // ⭐ Resetear imagen para edición
        stats: {
          hp: editingPokemon.stats?.hp || 50,
          attack: editingPokemon.stats?.attack || 50,
          defense: editingPokemon.stats?.defense || 50,
          speed: editingPokemon.stats?.speed || 50,
        }
      });
      
      // Si tiene imagen existente, mostrar preview
      if (editingPokemon.imageUrl) {
        setImagePreview(editingPokemon.imageUrl);
      } else {
        setImagePreview('');
      }
    } else {
      console.log("=== NUEVO POKEMON ===");
      setForm(initialState);
      setImagePreview('');
    }
  }, [editingPokemon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    console.log(`Campo ${name} cambió a:`, value);
    
    if (['hp', 'attack', 'defense', 'speed'].includes(name)) {
      const numValue = parseInt(value, 10) || 0;
      console.log(`Stat ${name} cambió a:`, numValue);
      
      setForm(prevForm => {
        const newForm = {
          ...prevForm,
          stats: {
            ...prevForm.stats,
            [name]: numValue,
          },
        };
        console.log("Stats actualizadas:", newForm.stats);
        return newForm;
      });
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  // ⭐ FUNCIÓN CORREGIDA para manejar archivos
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Archivo seleccionado:", file);
    console.log("Tamaño del archivo:", (file.size / 1024 / 1024).toFixed(2) + "MB");
    console.log("Tipo de archivo:", file.type);

    // ⭐ IMPORTANTE: Guardar el FILE object, no base64
    setForm(prevForm => ({ ...prevForm, image: file }));

    // Solo para preview visual, generar base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("=== ENVIANDO FORMULARIO ===");
    console.log("Datos del formulario:", form);
    console.log("Stats específicamente:", form.stats);
    console.log("Imagen (File object):", form.image);
    console.log("Tipo de stats:", typeof form.stats);
    
    // ⭐ Validar que stats sea un objeto válido
    const validatedForm = {
      ...form,
      stats: {
        hp: parseInt(form.stats.hp) || 0,
        attack: parseInt(form.stats.attack) || 0,
        defense: parseInt(form.stats.defense) || 0,
        speed: parseInt(form.stats.speed) || 0,
      },
      level: parseInt(form.level) || 1
    };

    console.log("Formulario validado antes de enviar:", validatedForm);
    console.log("Stats validadas:", validatedForm.stats);

    onSubmit(validatedForm);
    
    // ⭐ SOLO limpiar si es nuevo pokemon (no edición)
    if (!editingPokemon) {
      setForm(initialState);
      setImagePreview('');
    }
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

      {/* ⭐ DEBUG INFO */}
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', margin: '10px 0', fontSize: '12px' }}>
        <strong>Debug Info:</strong><br/>
        Stats: {JSON.stringify(form.stats)}<br/>
        Imagen: {form.image ? `${form.image.name} (${(form.image.size/1024).toFixed(2)}KB)` : 'Sin imagen'}<br/>
        Nombre: {form.name}<br/>
        Tipo: {form.type}
      </div>

      {/* Nombre */}
      <label htmlFor="pokemon-name" style={labelStyle}>Nombre</label>
      <input
        id="pokemon-name"
        name="name"
        placeholder="Nombre del Pokémon"
        value={form.name}
        onChange={handleChange}
        required
        maxLength={50}
        style={inputStyle}
      />

      {/* Tipo */}
      <label htmlFor="pokemon-type" style={labelStyle}>Tipo</label>
      <input
        id="pokemon-type"
        name="type"
        placeholder="Tipo del Pokémon"
        value={form.type}
        onChange={handleChange}
        required
        maxLength={100}
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
        min={1}
        max={100}
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

      {/* ⭐ IMAGEN CORREGIDA */}
      <label htmlFor="pokemon-img" style={labelStyle}>Imagen (máx. 5MB)</label>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="pokemon-img" style={fileButtonStyle}>
          {form.image ? `Cambiar imagen (${form.image.name})` : 'Seleccionar imagen'}
          <input
            id="pokemon-img"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="preview"
              style={{ 
                width: '100%', 
                maxWidth: '200px',
                height: 'auto', 
                marginTop: '10px', 
                marginBottom: '1rem', 
                borderRadius: '5px',
                border: '2px solid #ddd'
              }}
            />
            <p style={{ fontSize: '12px', color: '#666' }}>
              {form.image && `Archivo: ${form.image.name} (${(form.image.size/1024/1024).toFixed(2)}MB)`}
            </p>
          </div>
        )}
      </div>

      {/* ⭐ STATS SECTION */}
      <fieldset style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', margin: '10px 0' }}>
        <legend style={{ fontWeight: 'bold', padding: '0 5px' }}>Estadísticas</legend>
        
        <label htmlFor="pokemon-hp" style={labelStyle}>HP: {form.stats.hp}</label>
        <input
          id="pokemon-hp"
          name="hp"
          type="number"
          value={form.stats.hp}
          onChange={handleChange}
          min={0}
          max={999}
          style={inputStyle}
        />

        <label htmlFor="pokemon-attack" style={labelStyle}>Ataque: {form.stats.attack}</label>
        <input
          id="pokemon-attack"
          name="attack"
          type="number"
          value={form.stats.attack}
          onChange={handleChange}
          min={0}
          max={999}
          style={inputStyle}
        />

        <label htmlFor="pokemon-defense" style={labelStyle}>Defensa: {form.stats.defense}</label>
        <input
          id="pokemon-defense"
          name="defense"
          type="number"
          value={form.stats.defense}
          onChange={handleChange}
          min={0}
          max={999}
          style={inputStyle}
        />
        
        <label htmlFor="pokemon-speed" style={labelStyle}>Velocidad: {form.stats.speed}</label>
        <input
          id="pokemon-speed"
          name="speed"
          type="number"
          value={form.stats.speed}
          onChange={handleChange}
          min={0}
          max={999}
          style={inputStyle}
        />
      </fieldset>

      {/* Botones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: '#00CFFF' }}
        >
          {editingPokemon ? 'Actualizar' : 'Guardar'}
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