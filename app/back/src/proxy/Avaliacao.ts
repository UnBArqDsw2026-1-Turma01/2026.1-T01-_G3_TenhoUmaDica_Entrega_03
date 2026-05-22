export class Avaliacao {
    private id: string; 
    private avaliacaoPontualidade: number;
    private avaliacaoDidatica: number;
    private avaliacaoGeral: number;
    private feedbackEscrito: string;
    private dataCriacao: Date; 

    constructor(
        id: string, 
        avaliacaoPontualidade: number, 
        avaliacaoDidatica: number, 
        avaliacaoGeral: number, 
        feedbackEscrito: string, 
        dataCriacao: Date
    ) {
        this.id = id;
        this.avaliacaoPontualidade = avaliacaoPontualidade;
        this.avaliacaoDidatica = avaliacaoDidatica;
        this.avaliacaoGeral = avaliacaoGeral;
        this.feedbackEscrito = feedbackEscrito;
        this.dataCriacao = dataCriacao;
    }

    public postar(): void {
        console.log(`[Avaliacao] A avaliação ${this.id} foi postada com sucesso.`);
    }

    public editar(): void {
        console.log(`[Avaliacao] A avaliação ${this.id} foi editada.`);
    }

    public deletar(): void {
        console.log(`[Avaliacao] A avaliação ${this.id} foi deletada.`);
    }

    public getAvaliacaoGeral(): number {
        return this.avaliacaoGeral;
    }
}