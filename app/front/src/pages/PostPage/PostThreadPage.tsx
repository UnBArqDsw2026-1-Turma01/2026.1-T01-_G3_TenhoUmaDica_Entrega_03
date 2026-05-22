import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FirebaseAuthModal } from "../../components/FirebaseAuthModal";
import { loadDebugToken } from "../../utils/firebaseDebugToken";
import "../AvaliacoesPage/AvaliacoesPage.css";

type ThreadCommentNode = {
  id: string;
  idCriador: string;
  texto: string;
  dataCriacao: string;
  contadorCurtida: number;
  contadorDislike?: number;
  threadComentario?: {
    respostas?: ThreadCommentNode[];
  };
};

type PostDetail = {
  id: string;
  tipo: string;
  texto: string;
  descricao: string;
  dataCriacao: string;
  contadorCurtida: number;
  idCriador: string;
  avaliacao?: number;
  threadComentario?: {
    respostas?: ThreadCommentNode[];
  };
};

async function fetchPostDetail(postId: string): Promise<PostDetail | null> {
  if (!postId) return null;
  const response = await fetch(`http://localhost:3000/forum/posts/${postId}/completo`);
  if (!response.ok) return null;
  const data = await response.json();
  if (data && data.id) return data as PostDetail;
  return {
    id: data.postId ?? postId,
    tipo: 'topico',
    texto: '',
    descricao: '',
    dataCriacao: new Date().toISOString(),
    contadorCurtida: 0,
    idCriador: '',
    threadComentario: { respostas: data.comentarios ?? [] },
  } as PostDetail;
}

export default function PostThreadPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rootCommentText, setRootCommentText] = useState("");
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [debugToken, setDebugToken] = useState(() => loadDebugToken());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchPostDetail(postId ?? "")
      .then((currentPost) => {
        if (!isMounted) {
          return;
        }

        setPost(currentPost);
        console.debug("[comments-debug] post loaded", {
          postId,
          hasThread: Boolean(currentPost?.threadComentario?.respostas?.length),
          threadCount: currentPost?.threadComentario?.respostas?.length ?? 0,
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar o tópico:", error);
        if (isMounted) {
          setPost(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const refreshPost = async () => {
    if (!postId) {
      return;
    }

    const currentPost = await fetchPostDetail(postId);
    setPost(currentPost);
  };

  const handleSubmitRootComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postId || !debugToken.trim()) {
      alert("Informe o token Firebase antes de publicar a resposta.");
      return;
    }

    if (!rootCommentText.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.debug("[comments-debug] creating root comment", {
        postId,
        tokenPreview: `${debugToken.slice(0, 12)}...`,
        textLength: rootCommentText.length,
      });

      const response = await fetch(`http://localhost:3000/forum/posts/${postId}/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${debugToken}`,
        },
        body: JSON.stringify({ texto: rootCommentText }),
      });

      const payload = await response.json();
      console.debug("[comments-debug] root comment response", payload);

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Falha ao criar comentário: ${response.status} ${response.statusText} ${text}`);
      }

      setRootCommentText("");
      await refreshPost();
    } catch (error) {
      console.error(error);
      alert("Não foi possível enviar a resposta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentCommentId: string) => {
    if (!postId || !debugToken.trim()) {
      alert("Informe o token Firebase antes de publicar a resposta.");
      return;
    }

    if (!replyText.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.debug("[comments-debug] creating reply", {
        postId,
        parentCommentId,
        tokenPreview: `${debugToken.slice(0, 12)}...`,
        textLength: replyText.length,
      });

      const response = await fetch(
        `http://localhost:3000/forum/posts/${postId}/comentarios/${parentCommentId}/respostas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${debugToken}`,
          },
          body: JSON.stringify({ texto: replyText }),
        },
      );

      const payload = await response.json();
      console.debug("[comments-debug] reply response", payload);

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Falha ao criar resposta: ${response.status} ${response.statusText} ${text}`);
      }

      setReplyText("");
      setReplyTargetId(null);
      await refreshPost();
    } catch (error) {
      console.error(error);
      alert("Não foi possível enviar a resposta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolvedThreadComments = post?.threadComentario?.respostas ?? [];
  const topicLabel = post?.tipo === "avaliacao" ? "Avaliação" : "Tópico";
  const topicTitle = post?.descricao || "Sem Título";
  const topicContent = post?.texto || "Sem conteúdo disponível.";

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
                <h1>{topicTitle}</h1>
                <div className="course-score">
                  <StarIcon filled />
                  <span>4.2</span>
                </div>
              </div>
              <p className="course-banner__subtitle">
                {topicContent}
              </p>
            </div>
          </div>

          <div className="course-meta-card">
            <div className="course-meta-card__intro">
              <p>
                Visualização detalhada do tópico selecionado, com os comentários retornados pelo facade.
              </p>
            </div>
            <div className="course-meta-card__stats">
              <span className="stat-pill">{topicLabel}</span>
              <span className="stat-pill">{resolvedThreadComments.length} respostas</span>
              <button type="button" className="stat-pill stat-pill--link" onClick={() => navigate("/posts")}>
                Voltar ao fórum
              </button>
            </div>
          </div>
        </section>

        <section className="screen-tabs" aria-label="Seções do curso">
          <button type="button" className="tab-button active" onClick={() => navigate("/posts")}>Fórum</button>
          <button type="button" className="tab-button">Conteúdos</button>
          <button type="button" className="tab-button" onClick={() => navigate("/avaliacoes")}>Avaliações</button>
        </section>

        <section className="reviews-panel">
          {isLoading ? (
            <div className="empty-state">
              <strong>Carregando tópico...</strong>
              <p>Aguarde enquanto buscamos o post e suas respostas.</p>
            </div>
          ) : !post ? (
            <div className="empty-state">
              <strong>Tópico não encontrado.</strong>
              <p>Confira o link acessado ou volte para a lista do fórum.</p>
            </div>
          ) : (
            <>
              <article className="review-card review-card--detail">
                <div className="review-card__header">
                  <div className="author-block">
                    <div className="avatar avatar--review">
                      {post.idCriador ? post.idCriador.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="author-line">
                        <strong>Usuário ({post.idCriador?.substring(0, 5)}...)</strong>
                        <span className="author-badge">Membro</span>
                      </div>
                      <p className="author-meta">
                        Criado em: {new Date(post.dataCriacao).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <strong className="post-detail-title">{post.descricao || "Sem Título"}</strong>
                <p className="review-text review-text--detail">{post.texto}</p>

                <div className="review-tags">
                  <span className="mini-pill ghost">{post.tipo}</span>
                </div>

                <div className="review-actions">
                  <button type="button" className="action-chip">
                    <LikeIcon />
                    {post.contadorCurtida}
                  </button>
                </div>
              </article>

              <section className="thread-compose">
                <div className="thread-panel__header thread-panel__header--compose">
                  <h2>Responder ao tópico</h2>
                  <span>Use o formulário abaixo para inserir uma nova resposta</span>
                </div>

                <form className="thread-compose__form" onSubmit={handleSubmitRootComment}>
                  <textarea
                    className="modal-input thread-compose__field"
                    placeholder="Escreva sua resposta..."
                    value={rootCommentText}
                    onChange={(event) => setRootCommentText(event.target.value)}
                    required
                  />

                  <div className="thread-auth-row">
                    <input
                      type="text"
                      className="modal-input thread-auth-row__token"
                      placeholder="DEBUG: Token Firebase para autenticação"
                      value={debugToken}
                      onChange={(event) => setDebugToken(event.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="modal-btn modal-btn-cancel"
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      Gerar Token Rest API
                    </button>
                  </div>

                  <div className="modal-footer thread-compose__footer">
                    <button
                      type="button"
                      className="modal-btn modal-btn-cancel"
                      onClick={() => {
                        setRootCommentText("");
                        setReplyTargetId(null);
                        setReplyText("");
                      }}
                    >
                      Limpar
                    </button>
                    <button type="submit" className="modal-btn modal-btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Responder"}
                    </button>
                  </div>
                </form>
              </section>

              <section className="thread-panel">
                <div className="thread-panel__header">
                  <h2>Respostas</h2>
                  <span>{resolvedThreadComments.length} comentário(s)</span>
                </div>

                {resolvedThreadComments.length === 0 ? (
                  <div className="empty-state empty-state--thread">
                    <strong>Ainda não há respostas.</strong>
                    <p>Seja o primeiro a responder a este tópico.</p>
                  </div>
                ) : (
                  <div className="thread-list">
                    {resolvedThreadComments.map((comment) => (
                      <ThreadCommentCard
                        key={comment.id}
                        comment={comment}
                        depth={0}
                        replyTargetId={replyTargetId}
                        replyText={replyText}
                        isSubmitting={isSubmitting}
                        onStartReply={(commentId) => {
                          setReplyTargetId(commentId);
                          setReplyText("");
                        }}
                        onCancelReply={() => {
                          setReplyTargetId(null);
                          setReplyText("");
                        }}
                        onReplyTextChange={setReplyText}
                        onSubmitReply={handleSubmitReply}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </section>
      </main>

      <FirebaseAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onTokenReceived={(token) => {
          console.debug("[firebase-debug] token received and persisted", {
            tokenPreview: `${token.slice(0, 12)}...`,
          });
          setDebugToken(token);
        }}
      />
    </div>
  );
}

type ThreadCommentCardProps = {
  comment: ThreadCommentNode;
  depth: number;
  replyTargetId: string | null;
  replyText: string;
  isSubmitting: boolean;
  onStartReply: (commentId: string) => void;
  onCancelReply: () => void;
  onReplyTextChange: (value: string) => void;
  onSubmitReply: (parentCommentId: string) => Promise<void>;
};

function ThreadCommentCard({
  comment,
  depth,
  replyTargetId,
  replyText,
  isSubmitting,
  onStartReply,
  onCancelReply,
  onReplyTextChange,
  onSubmitReply,
}: ThreadCommentCardProps) {
  const responses = comment.threadComentario?.respostas ?? [];
  const isNestedReply = depth > 0;

  return (
    <article
      className={isNestedReply ? "thread-comment thread-comment--nested" : "thread-comment"}
      style={{ marginLeft: `${depth * 16}px` }}
    >
      <div className="thread-comment__header">
        <div className="author-block">
          <div className="avatar avatar--review">
            {comment.idCriador ? comment.idCriador.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="author-line">
              <strong>Usuário ({comment.idCriador?.substring(0, 5)}...)</strong>
              <span className="author-badge">Resposta</span>
            </div>
            <p className="author-meta">
              Criado em: {new Date(comment.dataCriacao).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <p className="thread-comment__text">{comment.texto}</p>

      <div className="review-actions thread-comment__actions">
        <button type="button" className="action-chip">
          <LikeIcon />
          {comment.contadorCurtida}
        </button>
        <button type="button" className="action-chip ghost" onClick={() => onStartReply(comment.id)}>
          <MessageIcon />
          Responder
        </button>
      </div>

      {replyTargetId === comment.id ? (
        <form
          className="thread-reply-form"
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmitReply(comment.id);
          }}
        >
          <textarea
            className="modal-input thread-compose__field"
            placeholder="Escreva sua resposta a este comentário..."
            value={replyText}
            onChange={(event) => onReplyTextChange(event.target.value)}
            required
          />

          <div className="modal-footer thread-compose__footer">
            <button type="button" className="modal-btn modal-btn-cancel" onClick={onCancelReply}>
              Cancelar
            </button>
            <button type="submit" className="modal-btn modal-btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar resposta"}
            </button>
          </div>
        </form>
      ) : null}

      {responses.length > 0 ? (
        <div className="thread-comment__replies">
          <div className="thread-comment__divider" />
          {responses.map((response) => (
            <ThreadCommentCard
              key={response.id}
              comment={response}
              depth={depth + 1}
              replyTargetId={replyTargetId}
              replyText={replyText}
              isSubmitting={isSubmitting}
              onStartReply={onStartReply}
              onCancelReply={onCancelReply}
              onReplyTextChange={onReplyTextChange}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      ) : null}
    </article>
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