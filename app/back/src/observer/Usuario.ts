import { Observer } from './Observer';
import { PostConteudo } from './PostConteudo';
import { Comentario } from './Comentario';
import { randomUUID } from 'crypto';

export interface Disciplina {
    id: string;
    nome: string;
}

export interface TopicoForum {
    id: string;
    titulo: string;
}

export class Usuario implements Observer {
    private id: string;
    private foto: string;
    private nome: string;
    private email: string;
    private senha: string;
    private bio: string;
    private dataCadastro: Date;
    private disciplinasSalvas: Disciplina[] = [];
    private topicosSalvos: TopicoForum[] = [];
    private conteudoSalvo: PostConteudo[] = [];
    
    // Auxiliar para fins de testes unitários e validações em memória
    public notificacoesRecebidas: Array<{ tipo: string; alvo: any }> = [];

    constructor(nome: string, email: string, foto: string = 'default.png', bio: string = '') {
        this.id = randomUUID();
        this.nome = nome;
        this.email = email;
        this.foto = foto;
        this.senha = 'senha123';
        this.bio = bio;
        this.dataCadastro = new Date();
    }

    public getId(): string {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public getFoto(): string {
        return this.foto;
    }

    public getBio(): string {
        return this.bio;
    }

    public getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public getDisciplinasSalvas(): Disciplina[] {
        return this.disciplinasSalvas;
    }

    public getTopicosSalvos(): TopicoForum[] {
        return this.topicosSalvos;
    }

    public getConteudoSalvo(): PostConteudo[] {
        return this.conteudoSalvo;
    }

    public autenticar(): boolean {
        console.log(`Usuário [${this.nome}] autenticado com sucesso.`);
        return true;
    }

    public alterarSenha(novaSenha: string): void {
        this.senha = novaSenha;
        console.log(`Senha do usuário [${this.nome}] alterada.`);
    }

    public salvarDisciplina(disciplina: Disciplina): void {
        if (!this.disciplinasSalvas.includes(disciplina)) {
            this.disciplinasSalvas.push(disciplina);
            console.log(`Usuário [${this.nome}] salvou a disciplina "${disciplina.nome}".`);
        }
    }

    public salvarTopico(topico: TopicoForum): void {
        if (!this.topicosSalvos.includes(topico)) {
            this.topicosSalvos.push(topico);
            console.log(`Usuário [${this.nome}] salvou o tópico "${topico.titulo}".`);
        }
    }

    public salvarPostConteudo(post: PostConteudo): void {
        if (!this.conteudoSalvo.includes(post)) {
            this.conteudoSalvo.push(post);
            console.log(`Usuário [${this.nome}] salvou o post "${post.getTexto()}".`);
        }
    }

    public curtirComentario(comentario: Comentario): void {
        console.log(`Usuário [${this.nome}] curtiu o comentário [${comentario.getId()}].`);
        comentario.addCurtida();
    }

    public curtirPostConteudo(post: PostConteudo): void {
        console.log(`Usuário [${this.nome}] curtiu o post [${post.getId()}].`);
        post.addCurtida();
    }

    // Métodos da interface Observer (Modelo Push)
    public onNovoComentario(alvo: any): void {
        console.log(`[Notificação - ${this.nome}] Novo comentário adicionado no alvo.`);
        this.notificacoesRecebidas.push({ tipo: 'NOVO_COMENTARIO', alvo });
    }

    public onNovaResposta(alvo: any): void {
        console.log(`[Notificação - ${this.nome}] Nova resposta adicionada no alvo.`);
        this.notificacoesRecebidas.push({ tipo: 'NOVA_RESPOSTA', alvo });
    }

    public onUpvoteRecebido(alvo: any): void {
        console.log(`[Notificação - ${this.nome}] Novo upvote recebido no alvo.`);
        this.notificacoesRecebidas.push({ tipo: 'UPVOTE', alvo });
    }

    public onDownvoteRecebido(alvo: any): void {
        console.log(`[Notificação - ${this.nome}] Novo downvote recebido no alvo.`);
        this.notificacoesRecebidas.push({ tipo: 'DOWNVOTE', alvo });
    }

    public toJSON(): object {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            foto: this.foto,
            bio: this.bio,
            dataCadastro: this.dataCadastro,
            notificacoes: this.notificacoesRecebidas.map((n) => ({ tipo: n.tipo })),
        };
    }
}
