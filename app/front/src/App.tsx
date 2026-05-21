import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AvaliacoesPage } from "./pages/AvaliacoesPage/AvaliacoesPage";
import PostPage from "./pages/PostPage/post";

function Catalog() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Catálogo de Funcionalidades</h1>
      <p>Selecione uma das páginas abaixo para visualizar:</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap"}}>
        <Link to="/posts" style={linkStyle}>
          Post: Tópicos, Conteúdos, Avaliações
          <p>OBS: Funcionalidade de Conteúdos e de Comentários a implementar. Sem persistência. </p>
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  display: "inline-block",
  padding: "1rem 2rem",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s"
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/avaliacoes" element={<AvaliacoesPage />} />
        <Route path="/posts" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;