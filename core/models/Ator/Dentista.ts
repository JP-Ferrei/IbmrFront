import { Usuario } from "./Usuario";

export class Dentista extends Usuario {
  cro!: string;
  constructor(model?: Dentista) {
    super(model);

    if (!model) return;
    this.cro = model.cro;
  }
}
