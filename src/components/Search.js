import { useRef } from "react";
import { useKey } from "../hook/useKey";

export default function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      value={query}
      ref={inputElement}
    />
  );
}
