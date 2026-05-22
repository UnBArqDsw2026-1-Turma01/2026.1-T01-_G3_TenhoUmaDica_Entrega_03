import { TopicoFeed } from '../models/topico-feed.model';

export interface AlgoritmoOrdenacao {
  ordenar(lista: TopicoFeed[]): TopicoFeed[];
}
