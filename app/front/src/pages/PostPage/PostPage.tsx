import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AvaliacoesPage/AvaliacoesPage.css';
import { FirebaseAuthModal } from '../../components/FirebaseAuthModal';
import { loadDebugToken } from '../../utils/firebaseDebugToken';

// Interface que espelha os dados que vêm do NestJS (.toJSON() do seu modelo)
interface IPost {
  id: string;
  tipo: string;
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

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicText, setNewTopicText] = useState("");
  const [debugToken, setDebugToken] = useState(() => loadDebugToken());

  // Estados do Modal de Auth Firebase
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // useEffect roda essa função assim que a página é carregada pela primeira vez
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then((data: IPost[]) => {
        const topicos = data.filter(post => post.tipo === 'topico');
        setPosts(topicos);
      })
      .catch(err => console.error("Erro ao carregar posts:", err));
  }, []);

  const handleAddTopic = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTopicTitle("");
    setNewTopicText("");
    setDebugToken("");
  };

  const handleSubmitTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts/topico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${debugToken}`,
        },
        body: JSON.stringify({ texto: newTopicText, descricao: newTopicTitle })
      });
      
      if (response.ok) {
        const newlyCreatedPost = await response.json();
        setPosts(prev => [newlyCreatedPost, ...prev]);
        handleCloseModal();
      } else {
        alert("Erro ao criar tópico. Verifique se o Token é válido e se a API está online.");
      }
    } catch (err) {
      console.error(err);
      alert("Falha na requisição!");
    }
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
                    <button
                      type="button"
                      className="action-chip ghost"
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
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

      {/* Modal de Adicionar Tópico */}
      {isModalOpen && (
        <div className="modal-overlay">
          <form className="modal-container" onSubmit={handleSubmitTopic}>
            <div className="modal-header">
              <h2>Novo Tópico</h2>
              <button type="button" className="modal-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            
            <div className="modal-form-group">
              <label>Título do Tópico</label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="Ex: Como isolar essa variável em Limites?"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Conteúdo</label>
              <textarea 
                className="modal-input" 
                placeholder="Descreva sua dúvida, código ou imagem..."
                value={newTopicText}
                onChange={(e) => setNewTopicText(e.target.value)}
                required
              />
            </div>

            <div className="modal-toolbar">
              <button type="button" className="modal-toolbar-btn">Inserir Imagem</button>
              <button type="button" className="modal-toolbar-btn">Anexo</button>
            </div>

            <div className="modal-form-group" style={{ marginTop: 'auto' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🚨 DEBUG: UID do Firebase</span>
                <button 
                  type="button" 
                  onClick={() => setIsAuthModalOpen(true)}
                  style={{
                    background: '#f6b41a',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                >
                  Gerar Token Rest API
                </button>
              </label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="Ex: bearer-fake-uid ou token real"
                style={{ fontFamily: 'monospace', fontSize: '12px' }}
                value={debugToken}
                onChange={(e) => setDebugToken(e.target.value)}
                required
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="modal-btn modal-btn-cancel" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button type="submit" className="modal-btn modal-btn-submit">
                Publicar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de Autenticação Firebase do DEBUG */}
      <FirebaseAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onTokenReceived={(token) => setDebugToken(token)} 
      />
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
