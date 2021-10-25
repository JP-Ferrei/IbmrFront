export class Produto implements Shared.IEntity {
  id!: any;
  nome!: string;
  quantidade!: number;
  validade!: Date;
  descricao!: string;

  constructor(model?: Produto) {
    if (!model) return;
    this.id = model.id;
    this.nome = model.id;
    this.quantidade = model.quantidade;
    this.validade = model.validade;
    this.descricao = model.descricao;
  }
}
