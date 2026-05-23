export interface Professor {
    getNome(): string;
    getIdAPIExterna(): string;
    getMediaAvaliacao(): number; 
    calculaMediaAvaliacao(): number;
}