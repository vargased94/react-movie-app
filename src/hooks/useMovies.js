import responseMovies from "../mocks/movies.json";

export function useMovies() {
  // const [responseMovies, setResponseMovies] = useState([]);

  const movies = responseMovies.Search;
  /*
    Esto se hace para no cambiar la estructura
    de los datos en todos los componentes
    y solo hacerlo en un solo lugar
  **/
  const mappedMovies = movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  // const getMovie = () => {

  // }

  return { movies: mappedMovies };
}