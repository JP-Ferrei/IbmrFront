import axios from "axios";

export const httpHeader = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    include: ""
  }
};

export const http = axios.create({
  baseURL: "https://localhost:5001/v1/",
  headers: httpHeader
});

http.interceptors.request.use(config => {
  if (localStorage.sessionApp) {
    let sessionApp = JSON.parse(localStorage.sessionApp);
    config.headers.Authorization = "Bearer " + sessionApp.token;
  }

  return config;
});

http.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response.statusCode === 401) {
      const response = error.response;
      console.log(response);
      console.log("teste");
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
