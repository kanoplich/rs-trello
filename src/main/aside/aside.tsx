import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./aside.css";

export function Aside() {
  return (
    <>
      <aside className="aside">
        <div>
          Accordeon1
          <Link to="/">DIV1</Link>
        </div>
        <div>
          Accordeon2
          <Link to="/boards">DIV2</Link>
        </div>
      </aside>
      <section className="naim-section">
        <Routes>
          {routes.map((item, index) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Routes>
      </section>
    </>
  );
}

const routes = [
  {
    path: "/",
    element: () => <div>HEHE</div>,
  },
  {
    path: "/boards",
    element: () => <div>BOARDS</div>,
  },
];
