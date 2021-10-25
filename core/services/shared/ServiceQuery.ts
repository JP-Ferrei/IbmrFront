import { AnoMesDia } from "@/assets/scripts/helper";
import { ServiceBase } from "./ServiceBase";

export class ServiceQuery extends ServiceBase {
  constructor(nomeControle: string) {
    super(nomeControle);
  }

  protected GetParametroPaginacaoOrdenacao(
    page: number,
    pageSize: number,
    sortBy: any[],
    desc: any[],
    search: any,
    columns: any[],
    filter?: string,
    expand?: string
  ) {
    let strParameters = "";

    if (pageSize) {
      if (pageSize > -1) {
        strParameters = "?$Top=" + pageSize;

        if (page) {
          strParameters += "&$Skip=" + (page - 1) * pageSize;
        }
      }
    }

    if (sortBy) {
      if (sortBy.length > 0) {
        strParameters += strParameters ? "&" : "?";
        strParameters += "$OrderBy=";

        sortBy.forEach(function(item: any, index: number) {
          strParameters += item.replace(".", "/");

          if (desc.length > 0) {
            if (desc[index] === true) {
              strParameters += " desc";
            }
          }

          if (index < sortBy.length - 1) {
            strParameters += ", ";
          }
        });
      }
    }

    if (search) {
      strParameters += strParameters ? "&" : "?";

      let newColumns: any[] = [];

      columns.forEach(column => {
        if (column.value && column.value != "actions") {
          if (column.type) {
            if (column.type === "number" && !isNaN(search)) {
              newColumns.push(`${column.value} eq ${search}`);
            } else if (column.type === "date" && search.length === 10) {
              if (search.indexOf("/") == 2 && search.indexOf("/", 3) == 5) {
                const [day, month, year] = search.split("/");

                if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                  const data = AnoMesDia(new Date(year, month - 1, day));
                  newColumns.push(`${column.value} eq ${data}`);
                }
              }
            } else if (
              column.type === "boolean" &&
              typeof search === "boolean"
            ) {
              newColumns.push(`Contains(${column.value}, '${search}')`);
            }
          } else {
            let newColumn = column.value.replace(".", "/");
            newColumns.push(`Contains(${newColumn}, '${search}')`);
          }
        }
      });

      strParameters += "$filter=" + newColumns.join(" or ");
    }

    if (filter) {
      strParameters += search ? " and " + filter : "&$filter=" + filter;
    }

    return strParameters;
  }

  public Listar(
    page: number,
    pageSize: number,
    sortBy: any[],
    desc: any[],
    search: any,
    columns: any[],
    filtro?: string,
    include?: string
  ) {
    return this._http.get(
      `${this._nomeControle}${this.GetParametroPaginacaoOrdenacao(
        page,
        pageSize,
        sortBy,
        desc,
        search,
        columns,
        filtro
      )}`,
      this.GetHeader(include)
    );
  }

  public ListarTudo(sortBy?: string): Promise<any> {
    let strParameters = this._nomeControle;

    if (sortBy) {
      strParameters += `?$orderby=${sortBy}`;
    }

    return this._http.get(strParameters, this.GetHeader());
  }

  public ListarTudoFiltro(filter: string): Promise<any>;
  public ListarTudoFiltro(filter: string, sortBy: string): Promise<any>;
  public ListarTudoFiltro(
    filter: string,
    sortBy: string,
    include: string
  ): Promise<any>;
  public ListarTudoFiltro(
    filter: string,
    sortBy?: string,
    include?: string
  ): Promise<any> {
    let strParameters = `${this._nomeControle}`;

    if (filter) {
      strParameters += `?$filter=${filter}`;
    }

    if (sortBy) {
      strParameters += filter ? "&" : "?";
      strParameters += `$orderby=${sortBy}`;
    }

    return this._http.get(strParameters, this.GetHeader(include));
  }

  public ListarTudoOrdenado(
    sortBy: string,
    desc: boolean = false
  ): Promise<any> {
    let strParameters = `${this._nomeControle}?$orderby=${sortBy}`;

    if (desc) {
      strParameters += " desc";
    }

    return this._http.get(strParameters, this.GetHeader());
  }

  public ObterPorId(id: any): Promise<any>;
  public ObterPorId(id: any, include: string): Promise<any>;
  public ObterPorId(id: any, include?: string): Promise<any> {
    return this._http.get(
      `${this._nomeControle}/${id}`,
      this.GetHeader(include)
    );
  }
}
