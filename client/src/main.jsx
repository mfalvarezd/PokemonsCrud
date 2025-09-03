// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Pokemons/components/layout";
import PokemonTable from "./Pokemons/components/pokemonTable";
import PokemonForm from "./Pokemons/components/pokemonForm";
import PokemonDetails from "./Pokemons/components/PokemonDetails";
import Modal from "./Pokemons/components/modal";
import PokemonApi from "./services/pokemonApi";
import "./index.css";

const MainApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [showForm, setShowForm] = useState(false); // controla el modal de agregar/editar
  const [loading, setLoading] = useState(false);

  // Cargar pokemons al iniciar
  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      try {
        const pokes = await PokemonApi.fetchPokemons();
        setPokemons(pokes);
      } catch (error) {
        console.error("Error cargando pokémons:", error);
      }
      setLoading(false);
    };
    loadPokemons();
  }, []);

  // Agregar o actualizar Pokémon
  const handleAddOrUpdate = async (pokemon) => {
    setLoading(true);
    try {
      if (pokemon._id) {
        const updated = await PokemonApi.updatePokemon(pokemon);

        // Actualizamos la lista
        setPokemons((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );

        // Actualizamos el modal de detalles si estamos viendo este Pokémon
        if (selectedPokemon?._id === updated._id) {
          setSelectedPokemon({ ...updated }); // fuerza re-render de imagen
        }

        // Cerrar modal de edición correctamente
        setEditingPokemon(null);
        setShowForm(false);
      } else {
        const added = await PokemonApi.addPokemon(pokemon);
        setPokemons((prev) => [...prev, added]);

        // Cerrar modal de creación
        setEditingPokemon(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error al guardar el Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar Pokémon
  const handleDelete = async (pokemon) => {
    if (!window.confirm(`¿Eliminar ${pokemon.name}?`)) return;
    setLoading(true);
    try {
      await PokemonApi.deletePokemon(pokemon._id);
      setPokemons((prev) => prev.filter((p) => p._id !== pokemon._id));
    } catch (error) {
      console.error("Error al eliminar el Pokémon:", error);
    }
    setLoading(false);
  };

  // Abrir modal para agregar Pokémon
  const handleAddClick = () => {
    setEditingPokemon(null);
    setShowForm(true);
  };

  // Abrir modal para editar Pokémon
  const handleEditClick = (pokemon) => {
    setEditingPokemon(pokemon);
    setShowForm(true);
  };

  return (
    <Layout>
      <div
        className="header-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Lista de Pokémons</h2>
        <button onClick={handleAddClick}>Agregar Pokémon</button>
      </div>

      {loading && <div className="loader">Cargando...</div>}

      {!loading && pokemons.length === 0 && (
        <div className="empty-state">No hay pokémons disponibles</div>
      )}

      {!loading && pokemons.length > 0 && (
        <PokemonTable
          pokemons={pokemons}
          onView={setSelectedPokemon}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      )}

      {/* Modal para agregar o editar Pokémon */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <PokemonForm
            editingPokemon={editingPokemon}
            onSubmit={handleAddOrUpdate}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {/* Modal para ver detalles */}
      {selectedPokemon && (
        <Modal onClose={() => setSelectedPokemon(null)}>
          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        </Modal>
      )}
    </Layout>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<MainApp />);
