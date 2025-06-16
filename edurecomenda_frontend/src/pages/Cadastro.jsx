import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/cursos";
const AREAS = ["", "IA", "Programação", "Infraestrutura", "Banco de Dados"];
const NIVEIS = ["", "Iniciante", "Intermediário", "Avançado"];

export default function Cadastro() {
  const [form, setForm] = useState({
    titulo: "", avaliacao: "", acessos: "", tempo: "", area: "", nivel: ""
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.avaliacao || !form.area || !form.nivel) {
      setErro("Preencha todos os campos obrigatórios!");
      return;
    }
    try {
      await axios.post(API_URL, form);
      setErro("");
      alert("Curso cadastrado com sucesso!");
      navigate("/");
    } catch {
      setErro("Erro ao salvar curso!");
    }
  };

  // ======== ESTILOS =======================
  const estilos = {
    pageBg: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #191f26 0%, #243a7d 90%, #3366ff 100%)",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    container: {
      width: 500,
      background: "rgba(28,32,48,0.97)",
      padding: "40px 36px",
      borderRadius: 26,
      boxShadow: "0 8px 38px #04102d77, 0 0 40px #47b2ff19",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    titulo: {
      fontSize: 32,
      fontWeight: 800,
      color: "#38d9fc",
      marginBottom: 32,
      textShadow: "0 2px 28px #38d9fcaa",
      letterSpacing: 1.1,
      textAlign: "center"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      width: "100%",
      marginTop: 0
    },
    input: {
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #314e82",
      fontSize: 17,
      background: "#19243c",
      color: "#fff",
      marginBottom: 0,
      boxShadow: "0 2px 12px #38d9fc18"
    },
    select: {
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #314e82",
      fontSize: 17,
      background: "#19243c",
      color: "#c4e4fd",
      marginBottom: 0,
      boxShadow: "0 2px 12px #38d9fc12"
    },
    btn: {
      padding: "12px 0",
      border: "none",
      borderRadius: 10,
      background: "linear-gradient(90deg,#00eaff 0%, #47b2ff 100%)",
      color: "#fff",
      fontWeight: 800,
      fontSize: 18,
      cursor: "pointer",
      marginTop: 8,
      marginBottom: 6,
      boxShadow: "0 2px 18px #27f2ff70",
      letterSpacing: 1.2
    },
    error: {
      color: "#ff4665",
      marginTop: 10,
      fontWeight: 700,
      textShadow: "0 2px 8px #ff466570"
    }
  };

  // ============= RENDER ================
  return (
    <div style={estilos.pageBg}>
      <div style={estilos.container}>
        <div style={estilos.titulo}>
          Cadastro de Curso <span style={{ color: "#34ffe3" }}>Tech</span>
        </div>
        <form onSubmit={onSubmit} style={estilos.form}>
          <input
            name="titulo"
            placeholder="Título *"
            style={estilos.input}
            value={form.titulo}
            onChange={onChange}
            required
          />
          <input
            name="avaliacao"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Nota *"
            style={estilos.input}
            value={form.avaliacao}
            onChange={onChange}
            required
          />
          <input
            name="acessos"
            type="number"
            min="0"
            placeholder="Acessos"
            style={estilos.input}
            value={form.acessos}
            onChange={onChange}
          />
          <input
            name="tempo"
            type="number"
            min="0"
            placeholder="Tempo (min)"
            style={estilos.input}
            value={form.tempo}
            onChange={onChange}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <select
              name="area"
              style={estilos.select}
              value={form.area}
              onChange={onChange}
              required
            >
              <option value="">Área *</option>
              {AREAS.filter((a) => a).map((area) => (
                <option value={area} key={area}>
                  {area}
                </option>
              ))}
            </select>
            <select
              name="nivel"
              style={estilos.select}
              value={form.nivel}
              onChange={onChange}
              required
            >
              <option value="">Nível *</option>
              {NIVEIS.filter((n) => n).map((nivel) => (
                <option value={nivel} key={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={estilos.btn}>
            Cadastrar
          </button>
        </form>
        {erro && <div style={estilos.error}>{erro}</div>}
      </div>
    </div>
  );
}
