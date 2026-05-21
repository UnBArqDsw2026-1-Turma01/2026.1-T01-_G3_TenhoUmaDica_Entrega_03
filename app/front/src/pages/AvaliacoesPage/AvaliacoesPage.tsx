import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AvaliacoesPage.css";

type ScopeFilter = "todos" | "professor" | "materia";

type ReviewPost = {
  id: string;
  tipo: string;
  texto: string;
  descricao: string;
  dataCriacao: string;
  contadorCurtida: number;
  idCriador: string;
  avaliacao?: number;
};

export function AvaliacoesPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewPost[]>([]);
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("todos");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then((data: ReviewPost[]) => {
        const avaliacoes = data.filter(post => post.tipo === 'avaliacao');
        setReviews(avaliacoes);
      })
      .catch(err => console.error("Erro ao carregar avaliações:", err));
  }, []);

  const visibleReviews = reviews.filter((review) => {
    // Como os dados reais não têm mais autor.papel nem disciplina, ignoramos filtro de escopo ou estendemos depois.
    const matchesScope = true; 

    const normalizedQuery = query.trim().toLowerCase();
    const searchSpace = [
      review.texto,
      review.descricao,
      review.idCriador
    ].join(" ").toLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || searchSpace.includes(normalizedQuery);

    return matchesScope && matchesQuery;
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">Logo</div>
          <nav className="main-nav" aria-label="Navegação principal">
            <a href="/" className="nav-link active">
              Painel
            </a>
            <a href="/" className="nav-link">
              Meus Cursos
            </a>
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
          <button type="button" className="tab-button" onClick={() => navigate('/posts')}>
            Fórum
          </button>
          <button type="button" className="tab-button">
            Conteúdos
          </button>
          <button type="button" className="tab-button active">
            Avaliações
          </button>
        </section>

        <section className="reviews-panel">
          <div className="reviews-toolbar">
            <div className="search-box">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Buscar avaliações"
                aria-label="Buscar avaliações"
              />
            </div>

            <button type="button" className="icon-button subtle" aria-label="Filtrar">
              <FilterIcon />
            </button>

            <div className="scope-actions">
              <button
                type="button"
                className={scopeFilter === "professor" ? "chip active" : "chip"}
                onClick={() => setScopeFilter("professor")}
              >
                Professor
              </button>
              <button
                type="button"
                className={scopeFilter === "materia" ? "chip active" : "chip"}
                onClick={() => setScopeFilter("materia")}
              >
                Matéria
              </button>
              <button type="button" className="chip primary">
                <PlusIcon />
                Nova avaliacao
              </button>
            </div>
          </div>

          <div className="reviews-list">
            {visibleReviews.length > 0 ? (
              visibleReviews.map((review) => (
                <article className="review-card" key={review.id}>
                  <div className="review-card__header">
                    <div className="author-block">
                      <div className="avatar avatar--review">
                        {review.idCriador ? review.idCriador.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="author-line">
                          <strong>Usuário ({review.idCriador?.substring(0, 5)}...)</strong>
                          <span className="author-badge">Membro</span>
                        </div>
                        <p className="author-meta">
                          Criado em: {new Date(review.dataCriacao).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="rating-stars" aria-label={`Nota ${review.avaliacao || 0} de 5`}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon key={index} filled={index < (review.avaliacao || 0)} />
                      ))}
                    </div>
                  </div>

                  <strong style={{ display: 'block', marginTop: '12px', fontSize: '14px', color: '#22354d' }}>
                    {review.descricao || 'Sem Título'}
                  </strong>

                  <p className="review-text">{review.texto}</p>

                  <div className="review-tags">
                    <span className="mini-pill ghost">{review.tipo}</span>
                  </div>

                  <div className="review-actions">
                    <button type="button" className="action-chip">
                      <LikeIcon />
                      {review.contadorCurtida}
                    </button>
                    <button type="button" className="action-chip ghost">
                      <MessageIcon />
                      Responder
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <strong>Nenhuma avaliação encontrada.</strong>
                <p>Altere a busca ou remova os filtros para ver os posts disponíveis.</p>
              </div>
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? "star-icon filled" : "star-icon"}
    >
      <path d="m12 3 2.7 5.46 6.03.88-4.36 4.25 1.03 6.01L12 16.7l-5.4 2.9 1.03-6.01-4.36-4.25 6.03-.88L12 3Z" />
    </svg>
  );
}
