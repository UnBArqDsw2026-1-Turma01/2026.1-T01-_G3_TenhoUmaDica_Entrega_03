import { Professor } from './Professor';
import { Avaliacao } from './Avaliacao';

export class ProfessorReal implements Professor {
    private idAPIExterna: string;
    private nome: string;
    private mediaAvaliacao: number; 
    private avaliacoes: Avaliacao[];

    constructor(idAPIExterna: string, nome: string, avaliacoes: Avaliacao[] = []) {
        this.idAPIExterna = idAPIExterna;
        this.nome = nome;
        this.avaliacoes = avaliacoes;
        this.mediaAvaliacao = 0;
    }

    public getNome(): string {
        return this.nome;
    }

    public getIdAPIExterna(): string {
        return this.idAPIExterna;
    }

    public calculaMediaAvaliacao(): number {
        console.log(" [ProfessorReal] Consultando BD e processando a média das avaliações");
        
        if (this.avaliacoes.length === 0) {
            this.mediaAvaliacao = 0;
            return this.mediaAvaliacao;
        }

        const soma = this.avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.getAvaliacaoGeral(), 0);
        this.mediaAvaliacao = soma / this.avaliacoes.length;
        
        return this.mediaAvaliacao;
    }

    public getMediaAvaliacao(): number {
        return this.calculaMediaAvaliacao();
    }

    public adicionarAvaliacao(avaliacao: Avaliacao): void {
        this.avaliacoes.push(avaliacao);
    }
}