import { Produto } from "~/core/models/Geral/Produto";
import { ServiceCrud } from "./../shared/ServiceCrud";
import { ArmazemService } from "./ArmazemService";

export class ProdutoService extends ServiceCrud {
  constructor() {
    super("produto");
  }

  public async Post(produtoObject: {
    nome: string;
    quantidade: number;
    validade: string;
    descricao: string;
    armazemId: string;
  }) {
    return this._http.post(
      `${this._nomeControle}`,
      produtoObject,
      this.GetHeader()
    );
  }
}
