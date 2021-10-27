import { Usuario } from "~/core/models/Ator/Usuario";
import { ServiceCrud } from "../shared/ServiceCrud";

export class UsuarioService extends ServiceCrud {
  constructor() {
    super("usuario");
  }

  public async GetByEmail(email: string): Promise<Usuario> {
    return this._http.get(
      `${this._nomeControle}/${email}/email`,
      this.GetHeader()
    );
  }
}
