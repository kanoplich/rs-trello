import React from "react";
import "./normalize.css";
import "./App.css";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Main } from "./main/main";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
