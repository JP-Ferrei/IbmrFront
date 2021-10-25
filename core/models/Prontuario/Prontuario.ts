import { Documento } from "./Documento";
import { PerguntaBooleana } from "./PerguntaBooleana";
import { PerguntaString } from "./PerguntaString";

export class Prontuario implements Shared.IEntity {
  id!: any;
  perguntaString: PerguntaString[] = [];
  perguntaBooleana: PerguntaBooleana[] = [];
  documento: Documento[] = [];
  constructor(model?: Prontuario) {
    if (!model) return;
    this.id = model.id;
    this.perguntaString = model.perguntaString;
    this.perguntaBooleana = model.perguntaBooleana;
    this.documento = model.documento;
  }
}
