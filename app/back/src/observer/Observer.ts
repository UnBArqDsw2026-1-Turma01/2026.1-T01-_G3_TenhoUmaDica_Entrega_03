export interface Observer {
    onNovoComentario(alvo: any): void;
    onNovaResposta(alvo: any): void;
    onUpvoteRecebido(alvo: any): void;
    onDownvoteRecebido(alvo: any): void;
}
