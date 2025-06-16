import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Cursos from "./pages/Cursos";

function App() {
  return (
    <Router>
      {}
      <nav
        style={{
          display: "flex",
          gap: 36,
          background: "rgba(25,35,58,0.92)",
          padding: "20px 0",
          borderRadius: 18,
          margin: "32px auto 48px auto",
          width: 900,
          fontSize: 22,
          fontWeight: 600,
          justifyContent: "center",
          boxShadow: "0 8px 40px #0ff2  ",
          letterSpacing: 0.6,
          border: "1.5px solid #2ef4f8",
          backdropFilter: "blur(1px)"
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#38d4fa",
            transition: ".22s",
            padding: "8px 32px",
            borderRadius: 10,
          }}
        >
          Listar Cursos
        </Link>
        <Link
          to="/cadastro"
          style={{
            textDecoration: "none",
            color: "#46ffb5",
            transition: ".22s",
            padding: "8px 32px",
            borderRadius: 10,
          }}
        >
          Cadastrar Curso
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Cursos />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      {}
      <div
        style={{
          position: "fixed",
          zIndex: -1,
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 80% at 52% 20%, #222f47 65%, #181c27 100%)",
        }}
      />
    </Router>
  );
}

export default App;
