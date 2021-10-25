export class URLService {
  public GetCurrentURL() {
    return window.location.href;
  }

  public GetApiURL() {
    return process.env.NODE_ENV == "development"
      ? "http://localhost:5000/v1/"
      : "http://api-development.nevoon.com.br/v1/";
  }
}
