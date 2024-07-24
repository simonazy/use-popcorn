import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((w) => (
        <WatchedMovie
          movie={w}
          key={w.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
