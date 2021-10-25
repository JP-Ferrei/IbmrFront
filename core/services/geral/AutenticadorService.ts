import { ServiceCrud } from "../shared/ServiceCrud";

export class AutenticadorService extends ServiceCrud {
  constructor() {
    super("autenticador");
  }

  public AutenticarUsuario(acesso: { email: string; senha: string }) {
    return this._http.post(`${this.GetNomeControle()}/usuario`, acesso);
  }
}
