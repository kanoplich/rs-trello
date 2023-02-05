import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./project.css";

export default function Project() {
  return (
    <>
      <aside className="aside">
        <div>ADD PROJECT NAME with img?</div>
        PLANNING
        <div>
          <Link to="board">BOARD</Link>
        </div>
        <div>
          <Link to="roadmap">ROADMAP</Link>
        </div>
      </aside>
      <section className="main-section">
        <Routes>
          <Route path="board" element={<div>BOARDS</div>} />
          <Route path="roadmap" element={<div>ROADMAP</div>} />
        </Routes>
      </section>
    </>
  );
}
