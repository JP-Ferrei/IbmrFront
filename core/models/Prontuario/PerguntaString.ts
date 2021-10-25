export class PerguntaString implements Shared.IEntity {
  id!: any;
  pergunta!: string;
  resposta!: string;
  constructor(model?: PerguntaString) {
    if (!model) return;
    this.id = model.id;
    this.pergunta = model.pergunta;
    this.resposta = model.resposta;
  }
}
