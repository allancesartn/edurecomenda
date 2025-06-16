import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/cursos";

const ICONES_POR_AREA = {
  "IA": "/icones/IA.png",
  "Programação": "/icones/PROGRAMAÇÃO.png",
  "Infraestrutura": "/icones/INFRAESTRUTURA.png",
  "Banco de Dados": "/icones/BANCODEDADOS.png"
};

const AREAS = ["", "IA", "Programação", "Infraestrutura", "Banco de Dados"];
const NIVEIS = ["", "Iniciante", "Intermediário", "Avançado"];
const CAMPOS_ORDENACAO = [
  { value: "", label: "Padrão" },
  { value: "avaliacao", label: "Nota" },
  { value: "acessos", label: "Acessos" },
  { value: "tempo", label: "Tempo" }
];

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    titulo: "", avaliacao: "", acessos: "", tempo: "", area: "", nivel: ""
  });
  const [erro, setErro] = useState("");
  const [filtros, setFiltros] = useState({
    area: "", nivel: "", ordem: "", sentido: "desc"
  });

  useEffect(() => { buscarCursos(); }, [filtros]);

  const buscarCursos = async () => {
    try {
      const params = {};
      if (filtros.area) params.area = filtros.area;
      if (filtros.nivel) params.nivel = filtros.nivel;
      if (filtros.ordem) params.ordem = filtros.ordem;
      if (filtros.sentido) params.sentido = filtros.sentido;
      const res = await axios.get(API_URL, { params });
      setCursos(res.data);
      setErro("");
    } catch {
      setErro("Erro ao carregar cursos");
    }
  };

  const editarCurso = (curso) => {
    setForm({
      titulo: curso.titulo,
      avaliacao: curso.avaliacao,
      acessos: curso.acessos,
      tempo: curso.tempo,
      area: curso.area,
      nivel: curso.nivel,
    });
    setEditandoId(curso.id);
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.avaliacao) {
      setErro("Preencha o título e avaliação!");
      return;
    }
    try {
      await axios.put(`${API_URL}/${editandoId}`, form);
      setEditandoId(null);
      setForm({ titulo: "", avaliacao: "", acessos: "", tempo: "", area: "", nivel: "" });
      buscarCursos();
      setErro("");
    } catch {
      setErro("Erro ao salvar curso!");
    }
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setForm({ titulo: "", avaliacao: "", acessos: "", tempo: "", area: "", nivel: "" });
  };

  const deletarCurso = async (id) => {
    if (window.confirm("Deseja realmente excluir este curso?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        buscarCursos();
      } catch {
        setErro("Erro ao excluir curso!");
      }
    }
  };

  // -------- ESTILIZAÇÃO ---------
  const estilos = {
    body: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #191f26 0%, #182c49 80%, #20254a 100%)",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif",
      paddingBottom: 40
    },
    container: {
      maxWidth: 1100, margin: "40px auto", background: "rgba(28,32,48,0.85)",
      padding: 32, borderRadius: 22, boxShadow: "0 6px 32px #04102d80",
      backdropFilter: "blur(3.5px)",
      minHeight: "70vh"
    },
    titulo: {
      fontSize: 36, fontWeight: 700, color: "#47b2ff", 
      marginBottom: 22,
      letterSpacing: 0.5,
      textShadow: "0 2px 16px #47b2ff55"
    },
    filtros: {
      display: "flex", gap: 15, marginBottom: 22, alignItems: "center",
      flexWrap: "wrap", background: "#212a3a99",
      padding: "12px 24px", borderRadius: 14,
      boxShadow: "0 1px 6px #0d233755"
    },
    select: {
      padding: 7, borderRadius: 8, border: "1px solid #304160",
      fontSize: 16, background: "#182437", color: "#b2c5e3",
      boxShadow: "0 1px 3px #1113"
    },
    btn: {
      padding: "8px 20px", border: "none", borderRadius: 10,
      background: "linear-gradient(90deg,#00eaff 0%, #47b2ff 100%)",
      color: "#fff", fontWeight: 700,
      fontSize: 16,
      cursor: "pointer", transition: ".18s",
      boxShadow: "0 2px 8px #0ff3",
    },
    btnDanger: {
      background: "linear-gradient(90deg,#ff4665 0%, #8f023e 100%)", marginLeft: 8,
      color: "#fff", fontWeight: 700, fontSize: 16,
      boxShadow: "0 2px 8px #f005",
    },
    btnEdit: {
      background: "linear-gradient(90deg,#36e0a4 0%, #47b2ff 100%)",
      color: "#fff", fontWeight: 700, fontSize: 16,
      marginRight: 6, boxShadow: "0 2px 8px #0ff5"
    },
    table: {
      width: "100%", borderCollapse: "separate", background: "#23283e77",
      borderRadius: 16, overflow: "hidden", marginBottom: 24,
      boxShadow: "0 2px 14px #0a1e3080"
    },
    th: {
      background: "#283655cc", color: "#61eaff", padding: 11, fontWeight: 700,
      fontSize: 17, borderBottom: "2px solid #1a263a"
    },
    td: {
      padding: 11, borderBottom: "1px solid #293452cc",
      color: "#e4e8f3", fontSize: 16
    },
    iconGlow: {
      background: "radial-gradient(circle, #8feaff 60%, #1976d2 100%)",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      boxShadow: "0 0 16px 2px #40e9ffbb, 0 0 36px 4px #64b6faff",
      border: "2.5px solid #d0f8ffff"
    },
    icon: {
      width: 24, height: 24, filter: "brightness(1.12)"
    },
    error: { color: "#ff4665", marginBottom: 18, fontWeight: 600, textShadow: "0 2px 10px #ff466570"},
    editForm: {background: "#21293a", borderRadius: 14, padding: "14px 24px", marginBottom: 28, boxShadow: "0 2px 12px #2229"},
    input: {
      padding: 8, borderRadius: 8, border: "1px solid #314e82", fontSize: 16, minWidth: 120,
      background: "#162032", color: "#fff"
    },
    footer: {
      color: "#5c7498", fontSize: 15, textAlign: "center", marginTop: 35,
      letterSpacing: 0.4, textShadow: "0 2px 6px #0008"
    }
  };

  // --------------- RENDER ---------------
  return (
    <div style={estilos.body}>
      <div style={estilos.container}>
        <div style={estilos.titulo}>
          EduRecomenda · Gerencie Cursos de <span style={{color:'#36e0a4'}}>Tecnologia</span>
        </div>

        {/* Filtros */}
        <div style={estilos.filtros}>
          <span style={{ fontWeight: 600, color: "#7ce9fc" }}>Filtrar:</span>
          <select style={estilos.select} value={filtros.area}
            onChange={e => setFiltros({ ...filtros, area: e.target.value })}>
            <option value="">Todas áreas</option>
            {AREAS.filter(a => a).map(area => <option value={area} key={area}>{area}</option>)}
          </select>
          <select style={estilos.select} value={filtros.nivel}
            onChange={e => setFiltros({ ...filtros, nivel: e.target.value })}>
            <option value="">Todos níveis</option>
            {NIVEIS.filter(n => n).map(nivel => <option value={nivel} key={nivel}>{nivel}</option>)}
          </select>
          <select style={estilos.select} value={filtros.ordem}
            onChange={e => setFiltros({ ...filtros, ordem: e.target.value })}>
            {CAMPOS_ORDENACAO.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}
          </select>
          <select style={estilos.select} value={filtros.sentido}
            onChange={e => setFiltros({ ...filtros, sentido: e.target.value })}>
            <option value="desc">Maior primeiro</option>
            <option value="asc">Menor primeiro</option>
          </select>
          <button style={estilos.btn} onClick={buscarCursos}>Filtrar</button>
          <button style={{ ...estilos.btn, background: "#303d56", color: "#b3c8f0" }}
            onClick={() => setFiltros({ area: "", nivel: "", ordem: "", sentido: "desc" })}>Limpar</button>
        </div>

        {/* Formulário de edição */}
        {editandoId &&
          <form onSubmit={onSubmit} style={estilos.editForm}>
            <input name="titulo" placeholder="Título" style={estilos.input}
              value={form.titulo} onChange={onChange} required />
            <input name="avaliacao" type="number" min="0" max="10" step="0.1"
              placeholder="Nota" style={estilos.input}
              value={form.avaliacao} onChange={onChange} required />
            <input name="acessos" type="number" min="0"
              placeholder="Acessos" style={estilos.input}
              value={form.acessos} onChange={onChange} />
            <input name="tempo" type="number" min="0"
              placeholder="Tempo (min)" style={estilos.input}
              value={form.tempo} onChange={onChange} />
            <select name="area" style={estilos.input}
              value={form.area} onChange={onChange} required>
              <option value="">Área</option>
              {AREAS.filter(a => a).map(area => <option value={area} key={area}>{area}</option>)}
            </select>
            <select name="nivel" style={estilos.input}
              value={form.nivel} onChange={onChange} required>
              <option value="">Nível</option>
              {NIVEIS.filter(n => n).map(nivel => <option value={nivel} key={nivel}>{nivel}</option>)}
            </select>
            <button type="submit" style={estilos.btn}>Salvar</button>
            <button type="button" style={{ ...estilos.btn, background: "#333d55", color: "#fff" }} onClick={cancelarEdicao}>Cancelar</button>
          </form>
        }

        {/* Mensagens de erro */}
        {erro && <div style={estilos.error}>{erro}</div>}

        {/* Tabela de cursos */}
        <div style={{ overflowX: "auto" }}>
          <table style={estilos.table}>
            <thead>
              <tr>
                <th style={estilos.th}>ID</th>
                <th style={estilos.th}>Ícone</th>
                <th style={estilos.th}>Título</th>
                <th style={estilos.th}>Nota</th>
                <th style={estilos.th}>Acessos</th>
                <th style={estilos.th}>Tempo</th>
                <th style={estilos.th}>Área</th>
                <th style={estilos.th}>Nível</th>
                <th style={estilos.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cursos.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ color: "#888", textAlign: "center" }}>
                    Nenhum curso cadastrado ou filtro sem resultados
                  </td>
                </tr>
              )}
              {cursos.map((curso) => (
                <tr key={curso.id}>
                  <td style={estilos.td}>{curso.id}</td>
                  <td style={estilos.td}>
                    <div style={estilos.iconGlow}>
                      <img
                        src={ICONES_POR_AREA[curso.area] || "/icones/default.png"}
                        alt={curso.area}
                        style={estilos.icon}
                        title={curso.area}
                      />
                    </div>
                  </td>
                  <td style={estilos.td}>{curso.titulo}</td>
                  <td style={estilos.td}>{curso.avaliacao}</td>
                  <td style={estilos.td}>{curso.acessos}</td>
                  <td style={estilos.td}>{curso.tempo}</td>
                  <td style={estilos.td}>{curso.area}</td>
                  <td style={estilos.td}>{curso.nivel}</td>
                  <td style={estilos.td}>
                    <button style={estilos.btnEdit} onClick={() => editarCurso(curso)}>Editar</button>
                    <button style={estilos.btnDanger} onClick={() => deletarCurso(curso.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={estilos.footer}>
          <span>EduRecomenda &copy; 2025 – Plataforma de Cursos de Tecnologia · CRUD & Filtro Integrado</span>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
