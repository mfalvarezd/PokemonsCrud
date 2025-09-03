// src/services/pokemonApi.js
const API_BASE_URL = "http://localhost:8080/v1/pokemons";

class PokemonApi {
  // fetch pokemons
  static fetchPokemons = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data.pokemons || [];
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      return [];
    }
  };

  // agregar pokemon
  static addPokemon = async (pokemon) => {
    try {
      const formData = new FormData();
      
      // Validar y comprimir imagen si es necesaria
      if (pokemon.image && pokemon.image instanceof File) {
        // Verificar tamaño de imagen (máximo 5MB)
        if (pokemon.image.size > 5 * 1024 * 1024) {
          throw new Error("La imagen es muy grande. Máximo 5MB permitido.");
        }
        formData.append("image", pokemon.image);
        console.log(`Imagen agregada: ${pokemon.image.name}, tamaño: ${(pokemon.image.size / 1024 / 1024).toFixed(2)}MB`);
      }
      
      // Iterar sobre las demás propiedades del pokemon
      for (const key in pokemon) {
        if (pokemon.hasOwnProperty(key) && key !== "image") {
          const value = pokemon[key];
          
          if (key === "stats" && typeof value === "object" && value !== null) {
            // Crear stats compacto sin espacios extra
            const compactStats = JSON.stringify(value);
            formData.append("stats", compactStats);
            console.log(`Stats agregado: ${compactStats}`);
          } else if (value !== null && value !== undefined && value !== "") {
            // Convertir a string y limitar longitud de campos de texto
            let stringValue = String(value);
            if (key === "name" && stringValue.length > 50) {
              stringValue = stringValue.substring(0, 50);
            }
            if (key === "type" && stringValue.length > 100) {
              stringValue = stringValue.substring(0, 100);
            }
            formData.append(key, stringValue);
            console.log(`${key}: ${stringValue}`);
          }
        }
      }

      // Mostrar resumen de lo que se envía
      console.log("=== Enviando FormData ===");
      const formDataEntries = Array.from(formData.entries());
      formDataEntries.forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(`${key}: [FILE] ${value.name} (${(value.size / 1024).toFixed(2)}KB)`);
        } else {
          console.log(`${key}: ${value.length > 100 ? value.substring(0, 100) + '...' : value}`);
        }
      });

      const res = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,

      });

      if (!res.ok) {
        let errorMessage;
        const contentType = res.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || `Error ${res.status}`;
        } else {
          const errorText = await res.text();
          // Extraer mensaje de error más limpio del HTML
          if (errorText.includes('MulterError: Field value too long')) {
            errorMessage = "Error: Uno de los campos es muy largo. Verifica el tamaño de la imagen o la longitud del texto.";
          } else if (errorText.includes('MulterError')) {
            errorMessage = "Error al subir archivo. Verifica el formato y tamaño de la imagen.";
          } else {
            errorMessage = `Error ${res.status}: ${errorText.substring(0, 200)}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return data.pokemonAdded || data;
    } catch (error) {
      console.error("Error en addPokemon:", error);
      throw error; // Re-lanzar el error para manejo en el componente
    }
  };

  // actualizar pokemon
  static updatePokemon = async (pokemon) => {
    try {
      const formData = new FormData();
      
      // Validar y procesar imagen
      if (pokemon.image && pokemon.image instanceof File) {
        if (pokemon.image.size > 5 * 1024 * 1024) {
          throw new Error("La imagen es muy grande. Máximo 5MB permitido.");
        }
        formData.append("image", pokemon.image);
      }
      
      for (const key in pokemon) {
        if (pokemon.hasOwnProperty(key) && key !== "image" && key !== "_id") {
          const value = pokemon[key];
          
          if (key === "stats" && typeof value === "object" && value !== null) {
            // Validar que stats tenga las propiedades esperadas
            const validStats = {
              hp: parseInt(value.hp) || 0,
              attack: parseInt(value.attack) || 0,
              defense: parseInt(value.defense) || 0,
              speed: parseInt(value.speed) || 0
            };
            
            const statsString = JSON.stringify(validStats);
            formData.append("stats", statsString);
            console.log(`Stats para actualización:`, validStats);
          } else if (value !== null && value !== undefined && value !== "") {
            let stringValue = String(value);
            if (key === "name" && stringValue.length > 50) {
              stringValue = stringValue.substring(0, 50);
            }
            if (key === "type" && stringValue.length > 100) {
              stringValue = stringValue.substring(0, 100);
            }
            formData.append(key, stringValue);
          }
        }
      }

      // Debug para actualización
      console.log("=== Actualizando Pokemon ===");
      const formDataEntries = Array.from(formData.entries());
      formDataEntries.forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(`${key}: [FILE] ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      });

      const res = await fetch(`${API_BASE_URL}/${pokemon._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        let errorMessage;
        const contentType = res.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || `Error ${res.status}`;
        } else {
          const errorText = await res.text();
          if (errorText.includes('MulterError: Field value too long')) {
            errorMessage = "Error: Uno de los campos es muy largo. Verifica el tamaño de la imagen o la longitud del texto.";
          } else if (errorText.includes('MulterError')) {
            errorMessage = "Error al subir archivo. Verifica el formato y tamaño de la imagen.";
          } else {
            errorMessage = `Error ${res.status}: ${errorText.substring(0, 200)}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("Pokemon actualizado en servidor:", data);
      return data.pokemonUpdated || data;
    } catch (error) {
      console.error("Error en updatePokemon:", error);
      throw error;
    }
  };

  // eliminar pokemon
  static deletePokemon = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { 
        method: "DELETE" 
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }
      
      return true;
    } catch (error) {
      console.error("Error en deletePokemon:", error);
      return false;
    }
  };
}

export default PokemonApi;