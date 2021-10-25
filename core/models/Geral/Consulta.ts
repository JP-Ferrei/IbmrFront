import { Cliente } from "../Ator/Cliente";
import { Dentista } from "../Ator/Dentista";

export class Documento implements Shared.IEntity {
  id!: any;
  dentista!: Dentista;
  cliente!: Cliente;
  dataHora!: Date;
  dataCriacao!: Date;
  preco!: number;
  constructor(model?: Documento) {
    if (!model) return;
    this.id = model.id;
    this.dentista = model.dentista;
    this.cliente = model.cliente;
    this.dataHora = model.dataHora;
    this.dataCriacao = model.dataCriacao;
    this.preco = model.preco;
  }
}
