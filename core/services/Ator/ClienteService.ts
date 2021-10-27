import { Cliente } from "~/core/models/Ator/Cliente";
import { ServiceCrud } from "../shared/ServiceCrud";

export class ClienteService extends ServiceCrud {
  constructor() {
    super("cliente");
  }

  public async post(cliente: Cliente): Promise<void> {
    return this._http.post(`${this._nomeControle}`, cliente, this.GetHeader());
  }
}
