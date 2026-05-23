import { Professor } from './Professor';

export class ProfessorProxy implements Professor {
    private professorReal: Professor;
    private mediaCache: number;
    private cacheValido: boolean;

    constructor(real: Professor) {
        this.professorReal = real;
        this.mediaCache = 0;
        this.cacheValido = false;
    }

    public getNome(): string {
        return this.professorReal.getNome();
    }

    public getIdAPIExterna(): string {
        return this.professorReal.getIdAPIExterna();
    }

    public getMediaAvaliacao(): number {
        if (!this.cacheValido) {
            console.log("[Proxy] Cache vazio/invalido. Delegando o calculo pesado para o ProfessorReal...");
            this.mediaCache = this.professorReal.calculaMediaAvaliacao();
            this.cacheValido = true;
        } else {
            console.log("[Proxy] Retornando a media direto do CACHE (economizando processamento!).");
        }
        
        return this.mediaCache;
    }

    public calculaMediaAvaliacao(): number {
        console.log("[Proxy] Recalculo forcado solicitado.");
        this.mediaCache = this.professorReal.calculaMediaAvaliacao();
        this.cacheValido = true;
        return this.mediaCache;
    }

    public invalidarCache(): void {
        this.cacheValido = false;
    }
}