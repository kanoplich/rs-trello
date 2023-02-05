import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./project.css";

export function Project() {
  const history = History;
  console.log("history", history);
  return (
    <>
      <aside className="aside">
        <div>ADD PROJECT NAME with img?</div>
        <div>
          PLANNING
          <Link to="/roadmap">ROADMAP</Link>
        </div>
        <div>
          <Link to="/boards">BOARD</Link>
        </div>
      </aside>
      <section className="naim-section">
        <Routes>
          <Route path="/boards" element={<div>BOARDS</div>} />
          <Route path="/roadmap" element={<div>ROADMAP</div>} />
        </Routes>
      </section>
    </>
  );
}
