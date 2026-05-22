export interface TopicoFeed {
  id?: string | number;
  votos: number;
  dataCriacao: Date | string | number;
  [key: string]: any;
}
