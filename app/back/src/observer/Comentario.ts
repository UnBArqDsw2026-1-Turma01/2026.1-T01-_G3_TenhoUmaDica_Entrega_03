import { Notificavel } from './Notificavel';
import { Observer } from './Observer';
import { TipoEvento } from './TipoEvento';
import { randomUUID } from 'crypto';

export class Comentario implements Notificavel {
    private id: string;
    private texto: string;
    private dataCriacao: Date;
    private contadorCurtidas: number;
    private contadorDislikes: number;
    private observadores: Observer[] = [];

    constructor(texto: string) {
        this.id = randomUUID();
        this.texto = texto;
        this.dataCriacao = new Date();
        this.contadorCurtidas = 0;
        this.contadorDislikes = 0;
    }

    public getId(): string {
        return this.id;
    }

    public getTexto(): string {
        return this.texto;
    }

    public getContadorCurtidas(): number {
        return this.contadorCurtidas;
    }

    public getContadorDislikes(): number {
        return this.contadorDislikes;
    }

    public postar(): void {
        console.log(`Comentário [${this.id}] postado: "${this.texto}"`);
    }

    public editar(novoTexto: string): void {
        this.texto = novoTexto;
        console.log(`Comentário [${this.id}] editado: "${this.texto}"`);
    }

    public deletar(): void {
        console.log(`Comentário [${this.id}] deletado.`);
    }

    public addCurtida(): void {
        this.contadorCurtidas++;
        console.log(`Comentário [${this.id}] recebeu uma curtida! Total: ${this.contadorCurtidas}`);
        this.notificarObservadores(TipoEvento.UPVOTE);
    }

    public addDislike(): void {
        this.contadorDislikes++;
        console.log(`Comentário [${this.id}] recebeu um dislike! Total: ${this.contadorDislikes}`);
        this.notificarObservadores(TipoEvento.DOWNVOTE);
    }

    public responder(comentario: Comentario): void {
        console.log(`Comentário [${this.id}] respondido pelo comentário [${comentario.getId()}]: "${comentario.getTexto()}"`);
        this.notificarObservadores(TipoEvento.NOVA_RESPOSTA);
    }

    // Métodos da interface Notificavel
    public adicionarObservador(obs: Observer): void {
        if (!this.observadores.includes(obs)) {
            this.observadores.push(obs);
        }
    }

    public removerObservador(obs: Observer): void {
        const index = this.observadores.indexOf(obs);
        if (index !== -1) {
            this.observadores.splice(index, 1);
        }
    }

    public notificarObservadores(evento: TipoEvento): void {
        for (const obs of this.observadores) {
            switch (evento) {
                case TipoEvento.NOVO_COMENTARIO:
                    obs.onNovoComentario(this);
                    break;
                case TipoEvento.NOVA_RESPOSTA:
                    obs.onNovaResposta(this);
                    break;
                case TipoEvento.UPVOTE:
                    obs.onUpvoteRecebido(this);
                    break;
                case TipoEvento.DOWNVOTE:
                    obs.onDownvoteRecebido(this);
                    break;
            }
        }
    }

    public toJSON(): object {
        return {
            id: this.id,
            texto: this.texto,
            dataCriacao: this.dataCriacao,
            contadorCurtidas: this.contadorCurtidas,
            contadorDislikes: this.contadorDislikes,
            observadoresCount: this.observadores.length,
        };
    }
}
