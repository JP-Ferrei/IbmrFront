import { ServiceQuery } from "./ServiceQuery";

export class ServiceCrud extends ServiceQuery {
  constructor(nomeControle: string) {
    super(nomeControle);
  }

  public Excluir(id: string) {
    return this._http.delete(`${this._nomeControle}/${id}`, this.GetHeader());
  }

  public Salvar(modelo: Shared.IEntity): Promise<any>;
  public Salvar(modelo: any, id: string): Promise<any>;
  public Salvar(modelo: any, id?: string): Promise<any> {
    if (id) {
      if (id.length > 0) {
        return this._http.patch(
          `${this._nomeControle}/${id}`,
          modelo,
          this.GetHeader()
        );
      }
    }

    return this._http.post(this._nomeControle, modelo, this.GetHeader());
  }
}
