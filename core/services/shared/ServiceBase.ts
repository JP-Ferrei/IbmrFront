import { http } from "@/core/ApiConfig";
import { AxiosInstance } from "axios";

export class ServiceBase {
  protected _nomeControle: string = "";
  protected _http: AxiosInstance;

  constructor(nomeControle: string) {
    this._nomeControle = nomeControle;
    this._http = http;
  }

  protected GetHeader(include?: string) {
    let header = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        include: ""
      }
    };

    if (include) {
      header.headers.include = include;
    }

    return header;
  }

  public GetNomeControle(): string {
    return this._nomeControle;
  }
}
