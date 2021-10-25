import { ServiceCrud } from "../shared/ServiceCrud";

export class ArmazemService extends ServiceCrud {
  constructor() {
    super("Armazem");
  }

  public async GetProdutos() {
    return this._http.get(`${this._nomeControle}/produtos`, this.GetHeader());
  }
}
