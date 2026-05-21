import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AvaliacoesPage/AvaliacoesPage.css';

// Interface que espelha os dados que vêm do NestJS (.toJSON() do seu modelo)
interface IPost {
  id: string;
  texto: string;
  descricao: string;
  dataCriacao: string;
  contadorCurtida: number;
  idCriador: string;
}

export default function PostPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [query, setQuery] = useState("");

  // useEffect roda essa função assim que a página é carregada pela primeira vez
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Erro ao carregar posts:", err));
  }, []);

  // Estado provisório simulando a chamada ao back-end
  const handleAddTopic = () => {
    alert("🚀 Aqui será feita a requisição POST para /posts/comentario\n\nNeste momento a aplicação pegaria o Título e Texto digitados em um modal e enviaria junto com o Token do Firebase para o NestJS!");
  };

  const visiblePosts = posts.filter(post => {
    const normalizedQuery = query.trim().toLowerCase();
    const searchSpace = [post.texto, post.descricao, post.idCriador].join(" ").toLowerCase();
    return normalizedQuery.length === 0 || searchSpace.includes(normalizedQuery);
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">Logo</div>
          <nav className="main-nav" aria-label="Navegação principal">
            <a href="/" className="nav-link active">Painel</a>
            <a href="/" className="nav-link">Meus Cursos</a>
          </nav>
        </div>

        <div className="topbar-actions">
          <button type="button" className="icon-button" aria-label="Notificações">
            <BellIcon />
          </button>
          <button type="button" className="avatar-button" aria-label="Perfil do usuário">
            <UserIcon />
          </button>
        </div>
      </header>

      <main className="page">
        <section className="course-panel">
          <div className="course-banner">
            <div className="course-banner__overlay" />
            <div className="course-banner__content">
              <p className="eyebrow">Disciplina</p>
              <div className="course-title-row">
                <h1>Cálculo 1</h1>
                <div className="course-score">
                  <StarIcon filled />
                  <span>4.2</span>
                </div>
              </div>
              <p className="course-banner__subtitle">
                Funções reais, limites, continuidade, derivadas e suas aplicações.
              </p>
            </div>
          </div>

          <div className="course-meta-card">
            <div className="course-meta-card__intro">
              <p>
                Disciplina fundamental para todas as engenharias. Aborda funções reais,
                limites e continuidade, derivadas e suas aplicações, e introdução às
                integrais. Pré-requisito para Cálculo 2.
              </p>
            </div>
            <div className="course-meta-card__stats">
              <span className="stat-pill">154 inscritos</span>
              <span className="stat-pill">62 conteúdos</span>
              <span className="stat-pill strong">Nota média: 4.3/5</span>
            </div>
          </div>
        </section>

        <section className="screen-tabs" aria-label="Seções do curso">
          <button type="button" className="tab-button active">Fórum</button>
          <button type="button" className="tab-button">Conteúdos</button>
          <button type="button" className="tab-button" onClick={() => navigate('/avaliacoes')}>Avaliações</button>
        </section>

        <section className="reviews-panel">
          <div className="reviews-toolbar">
            <div className="search-box">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Buscar tópico..."
                aria-label="Buscar tópico"
              />
            </div>

            <button type="button" className="icon-button subtle" aria-label="Filtrar">
              <FilterIcon />
            </button>

            <div className="scope-actions">
              <button type="button" onClick={handleAddTopic} className="chip primary">
                <PlusIcon />
                Add tópico
              </button>
            </div>
          </div>

          <div className="reviews-list">
            {visiblePosts.length === 0 ? (
              <div className="empty-state">
                <strong>Nenhum tópico encontrado.</strong>
                <p>Altere a busca ou crie um novo tópico no forum.</p>
              </div>
            ) : (
              visiblePosts.map(post => (
                <article className="review-card" key={post.id}>
                  <div className="review-card__header">
                    <div className="author-block">
                      <div className="avatar avatar--review">
                        {post.idCriador ? post.idCriador.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="author-line">
                          <strong>Usuário ({post.idCriador.substring(0, 5)}...)</strong>
                          <span className="author-badge">Membro</span>
                        </div>
                        <p className="author-meta">
                          Criado em: {new Date(post.dataCriacao).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <strong style={{ display: 'block', marginTop: '12px', fontSize: '14px', color: '#22354d' }}>
                    {post.descricao || 'Sem Título'}
                  </strong>
                  
                  <p className="review-text">{post.texto}</p>

                  <div className="review-tags">
                    <span className="mini-pill">ajuda</span>
                  </div>

                  <div className="review-actions">
                    <button type="button" className="action-chip">
                      <LikeIcon />
                      {post.contadorCurtida}
                    </button>
                    <button type="button" className="action-chip ghost">
                      <MessageIcon />
                      Responder
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.25 4.25" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4a5 5 0 0 0-5 5v2.3c0 .9-.3 1.8-.8 2.6L5 16h14l-1.2-2.1c-.5-.8-.8-1.7-.8-2.6V9a5 5 0 0 0-5-5Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c1.8-3.8 5-5.8 7-5.8S17.2 16.2 19 20" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 10V5a2 2 0 0 1 4-1l.8 4H19a2 2 0 0 1 2 2l-1 8a2 2 0 0 1-2 2H8.5c-.8 0-1.4-.3-1.8-.8L4 16.5V10h4Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? "star-icon filled" : "star-icon"}>
      <path d="m12 3 2.7 5.46 6.03.88-4.36 4.25 1.03 6.01L12 16.7l-5.4 2.9 1.03-6.01-4.36-4.25 6.03-.88L12 3Z" />
    </svg>
  );
}
