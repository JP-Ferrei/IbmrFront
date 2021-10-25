import { ServiceQuery } from "./ServiceQuery";

export class ServiceCrud extends ServiceQuery {
  constructor(nomeControle: string) {
    super(nomeControle);
  }

  public Excluir(id: number) {
    return this._http.delete(`${this._nomeControle}/${id}`, this.GetHeader());
  }

  public Salvar(modelo: Shared.IEntity): Promise<any>;
  public Salvar(modelo: any, id: number): Promise<any>;
  public Salvar(modelo: any, id?: number): Promise<any> {
    if (id) {
      if (id > 0) {
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
