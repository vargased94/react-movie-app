import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Movies } from "./Components/Movies";
import { useMovies } from "./hooks/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  // Es el primer input del usuario o la primera vez que se renderiza el componente
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === "") {
      setError("No se puede buscar una pelicula sin un titulo");
      return;
    }

    // Validar si la query es un numero
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch();

  // useRef valor que persiste entre renders
  // const counter = useRef(0);
  // counter.current++;
  // console.log("Render", counter.current);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ search });
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="search"
            onChange={handleChange}
            value={search}
            placeholder="Avengers, Star Wars, The Matrix ..."
            style={{
              border: '1px solid transparent',
              borderColor: error ? "red" : "transparent",
            }}
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
