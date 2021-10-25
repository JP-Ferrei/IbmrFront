import { Endereco } from "./Endereco";
import { Produto } from "./Produto";

export class Armazem implements Shared.IEntity {
  id!: any;
  descricao!: string;
  endereco!: Endereco;
  produtos: Produto[] = [];

  constructor(model?: Armazem) {
    if (!model) return;
    this.id = model.id;
    this.descricao = model.descricao;
    this.endereco = model.endereco;
    this.produtos = model.produtos;
  }
}
