import { Cliente } from "../Ator/Cliente";
import { Dentista } from "../Ator/Dentista";

export class Consulta implements Shared.IEntity {
  id!: any;
  dentista!: Dentista;
  cliente!: Cliente;
  dataHora!: Date;
  dataCriacao!: Date;
  constructor(model?: Consulta) {
    if (!model) return;
    this.id = model.id;
    this.dentista = model.dentista;
    this.cliente = model.cliente;
    this.dataHora = model.dataHora;
    this.dataCriacao = model.dataCriacao;
  }
}
