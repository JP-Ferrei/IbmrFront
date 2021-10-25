import { Prontuario } from "../Prontuario/Prontuario";
import { Usuario } from "./Usuario";

export class Cliente extends Usuario {
  prontuario!: Prontuario;
  responsavel!: Cliente;

  constructor(model?: Cliente) {
    super(model);

    if (!model) return;

    this.prontuario = model.prontuario;
    this.responsavel = model.responsavel;
  }
}
