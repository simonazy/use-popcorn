import { tempMovieData, tempWatchedData } from "./data/tempMovieData";
import "./index.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import NumResults from "./components/NumResults";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";

const KEY = "dcbc0845";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [watched, setWatchedMovies] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? "" : id));
  }
  function handleCloseMovie() {
    setSelectedId("");
  }
  function handleAddToWatched(movie) {
    setWatchedMovies(() => [...watched, movie]);
    setSelectedId("");
  }

  function handleDeleteWatchedMovie(id) {
    setWatchedMovies(() => watched.filter((w) => w.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies.");
          }
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!error && !isLoading && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              addToWatched={handleAddToWatched}
            />
          ) : (
            <>
              <WatchedSummary />
              <WatchedMovieList
                watched={watched}
                onAddWatchedMovie={handleAddToWatched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
