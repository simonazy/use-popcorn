import { useState } from "react";

export default function Box({ children }) {
  const [isBoxOpen, setIsBoxOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsBoxOpen(() => !isBoxOpen)}
      >
        {isBoxOpen ? "-" : "+"}
      </button>
      {isBoxOpen && children}
    </div>
  );
}
