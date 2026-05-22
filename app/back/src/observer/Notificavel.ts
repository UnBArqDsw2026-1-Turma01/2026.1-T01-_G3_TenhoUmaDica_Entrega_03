import { Observer } from './Observer';
import { TipoEvento } from './TipoEvento';

export interface Notificavel {
    adicionarObservador(obs: Observer): void;
    removerObservador(obs: Observer): void;
    notificarObservadores(evento: TipoEvento): void;
}
