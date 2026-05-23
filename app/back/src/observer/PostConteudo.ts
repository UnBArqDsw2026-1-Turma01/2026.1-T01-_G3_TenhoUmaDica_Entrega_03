import { Notificavel } from './Notificavel';
import { Observer } from './Observer';
import { TipoEvento } from './TipoEvento';
import { Comentario } from './Comentario';
import { randomUUID } from 'crypto';

export class PostConteudo implements Notificavel {
    private id: string;
    private texto: string;
    private descricao: string;
    private dataCriacao: Date;
    private contadorCurtidas: number;
    private contadorDislikes: number;
    private topicosSalvos: string[] = [];
    private observadores: Observer[] = [];
    private comentarios: Comentario[] = [];

    constructor(texto: string, descricao: string) {
        this.id = randomUUID();
        this.texto = texto;
        this.descricao = descricao;
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

    public getDescricao(): string {
        return this.descricao;
    }

    public getContadorCurtidas(): number {
        return this.contadorCurtidas;
    }

    public getContadorDislikes(): number {
        return this.contadorDislikes;
    }

    public getComentarios(): Comentario[] {
        return this.comentarios;
    }

    public postar(): void {
        console.log(`PostConteudo [${this.id}] postado: "${this.texto}" - ${this.descricao}`);
    }

    public editar(novoTexto: string, novaDescricao?: string): void {
        this.texto = novoTexto;
        if (novaDescricao) this.descricao = novaDescricao;
        console.log(`PostConteudo [${this.id}] editado: "${this.texto}" - ${this.descricao}`);
    }

    public deletar(): void {
        console.log(`PostConteudo [${this.id}] deletado.`);
    }

    public salvarTopico(): void {
        this.topicosSalvos.push(this.id);
        console.log(`PostConteudo [${this.id}] salvo como tópico.`);
    }

    public addCurtida(): void {
        this.contadorCurtidas++;
        console.log(`PostConteudo [${this.id}] recebeu uma curtida! Total: ${this.contadorCurtidas}`);
        this.notificarObservadores(TipoEvento.UPVOTE);
    }

    public addDislike(): void {
        this.contadorDislikes++;
        console.log(`PostConteudo [${this.id}] recebeu um dislike! Total: ${this.contadorDislikes}`);
        this.notificarObservadores(TipoEvento.DOWNVOTE);
    }

    public adicionarComentario(comentario: Comentario): void {
        this.comentarios.push(comentario);
        console.log(`Comentário [${comentario.getId()}] adicionado ao PostConteudo [${this.id}]`);
        this.notificarObservadores(TipoEvento.NOVO_COMENTARIO);
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
                    const ultimoComentario = this.comentarios[this.comentarios.length - 1];
                    obs.onNovoComentario(ultimoComentario || this);
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
            descricao: this.descricao,
            dataCriacao: this.dataCriacao,
            contadorCurtidas: this.contadorCurtidas,
            contadorDislikes: this.contadorDislikes,
            topicosSalvosCount: this.topicosSalvos.length,
            comentarios: this.comentarios.map((c) => c.toJSON()),
            observadoresCount: this.observadores.length,
        };
    }
}
