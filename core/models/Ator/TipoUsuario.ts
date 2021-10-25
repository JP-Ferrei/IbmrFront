export class TipoUsuario {
  id!: number;
  nome!: string;
  role!: string;

  constructor(model?: TipoUsuario) {
    if (!model) return;
    this.id = model.id;
    this.nome = model.nome;
    this.role = model.role;
  }
}
