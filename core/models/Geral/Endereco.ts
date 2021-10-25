export class Endereco implements Shared.IEntity {
  id!: any;
  rua!: string;
  bairro!: string;
  cidade!: string;
  numero!: number;

  constructor(model?: Endereco) {
    if (!model) return;
    this.id = model.id;
    this.rua = model.rua;
    this.bairro = model.bairro;
    this.cidade = model.cidade;
    this.numero = model.numero;
  }
}
