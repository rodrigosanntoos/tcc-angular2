import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptionsArgs, } from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class ApiService {
  private headers: Headers = new Headers();
  private requestOptions: RequestOptionsArgs = {};
  private apiServer: string = "https://api.github.com";

  constructor(private http: Http) {
    this.headers.set("Content-Type", "application/json");
    this.requestOptions.headers = this.headers;
  }

  get(endPoint: string, options ? : RequestOptionsArgs): Observable < Response > {
    return this.http.get(this.createUrl(endPoint), this.getRequestOptions(options));
  }

  options(endPoint: string, options ? : RequestOptionsArgs): Observable < Response > {
    return this.http.post(this.createUrl(endPoint), this.getRequestOptions(options));
  }

  createUrl(endPoint): string {
    let url = this.apiServer + endPoint;
    if (!endPoint.startsWith('/')) {
      url = this.apiServer + '/' + endPoint;
    }
    return url;
  }

  getRequestOptions(options ? : RequestOptionsArgs): RequestOptionsArgs {
    this.requestOptions.headers = this.headers;
    if (options) {
      Object.assign(options, this.requestOptions);
    }
    return this.requestOptions;
  }
}