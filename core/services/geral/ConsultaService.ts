import { Consulta } from "~/core/models/Geral/Consulta";
import { ServiceCrud } from "../shared/ServiceCrud";

export class ConsultaService extends ServiceCrud {
  constructor() {
    super("consulta");
  }

  public Get(include: string) {
    return this._http.get(`${this._nomeControle}`, this.GetHeader(include));
  }

  public Post(model: { dentistaId: string; clienteId: string; data: string }) {
    return this._http.post(`${this._nomeControle}`, model, this.GetHeader());
  }
}
