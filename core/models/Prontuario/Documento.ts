export class Documento implements Shared.IEntity {
  id!: any;
  observacao!: string;
  imagens!: any;
  constructor(model?: Documento) {
    if (!model) return;
    this.id = model.id;
    this.observacao = model.observacao;
    this.imagens = model.imagens;
  }
}
