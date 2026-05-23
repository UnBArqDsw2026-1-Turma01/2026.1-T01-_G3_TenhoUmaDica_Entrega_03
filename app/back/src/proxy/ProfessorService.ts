import { Professor } from './Professor';
import { ProfessorReal } from './ProfessorReal';
import { ProfessorProxy } from './ProfessorProxy';
import { Avaliacao } from './Avaliacao';

export class ProfessorService {
    private bancoDeProfessores: Map<string, Professor> = new Map();

    public cadastrarProfessor(idAPI: string, nome: string, avaliacoes: Avaliacao[]): void {
        const professorReal = new ProfessorReal(idAPI, nome, avaliacoes);
        const proxy = new ProfessorProxy(professorReal);
        this.bancoDeProfessores.set(idAPI, proxy);
    }

    public getProfessor(idAPI: string): Professor {
        const professor = this.bancoDeProfessores.get(idAPI);
        if (!professor) {
            throw new Error(`Professor com ID ${idAPI} nao encontrado.`);
        }
        return professor;
    }

    public calcularMedia(idAPI: string): number {
        const professor = this.getProfessor(idAPI);
        return professor.getMediaAvaliacao();
    }
}