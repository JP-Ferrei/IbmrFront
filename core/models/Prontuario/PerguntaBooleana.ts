export class PerguntaBooleana implements Shared.IEntity {
  id!: any;
  pergunta!: string;
  resposta!: boolean;
  constructor(model?: PerguntaBooleana) {
    if (!model) return;
    this.id = model.id;
    this.pergunta = model.pergunta;
    this.resposta = model.resposta;
  }
}
