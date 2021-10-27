import { Dentista } from "~/core/models/Ator/Dentista";
import { ServiceCrud } from "../shared/ServiceCrud";

export class DentistaService extends ServiceCrud {
  constructor() {
    super("dentista");
  }

  public async post(dentista: Dentista): Promise<void> {
    return this._http.post(`${this._nomeControle}`, dentista, this.GetHeader());
  }
}
