import { Produto } from "~/core/models/Geral/Produto";
import { ServiceCrud } from "../shared/ServiceCrud";

export class ArmazemService extends ServiceCrud {
  constructor() {
    super("Armazem");
  }

  public async AdicionarProduto(id: string, produto: Produto): Promise<void> {
    return this._http.post(
      `${this._nomeControle}/${id}/AdicionarProduto`,
      produto,
      this.GetHeader()
    );
  }

  public async GetProdutos() {
    return this._http.get(`${this._nomeControle}/produtos`, this.GetHeader());
  }

  public async GetFirst() {
    return await this._http.get(
      `${this._nomeControle}/first`,
      this.GetHeader()
    );
  }
}
