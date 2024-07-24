import { useState } from "react";

export default function Search({query, setQuery}) {
  
  return (
    <input
      className="search"
      type="text"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      value={query}
    />
  );
}
