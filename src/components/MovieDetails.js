import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "../hook/useKey";

const KEY = "dcbc0845";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  addToWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((w) => w.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (w) => w.imdbID === selectedId
  )?.userRating;

  useEffect(
    function () {
      setIsLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movie details: ", error);
        });
    },
    [selectedId]
  );

  useKey("escape", onCloseMovie);

  //destructure and rename
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const newWatchedMovie = {
    title,
    imdbRating,
    runtime: runtime,
    poster,
    year,
    imdbID: selectedId,
    userRating,
  };

  console.log(runtime);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      }; //cleanup function
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull;</p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    userRating={userRating}
                    setUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => addToWatched(newWatchedMovie)}
                    >
                      +Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated the movie with {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
