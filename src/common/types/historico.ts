export interface HistoricoEntry {
    id: string;
    data: string;        // ISO date string
    autor: string;
    perfil: string;
    campo: string;
    valorAnterior: string;
    valorNovo: string;
    observacao?: string;
}
