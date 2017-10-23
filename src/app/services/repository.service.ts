import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import { Repository } from '../models/repository';
import {ApiService} from "./api.service";

@Injectable()
export class RepositoryService {
  constructor(private api: ApiService) {
  }

  getRepositories(filter?: string): Observable<Repository[]> {
      let endPoint = '/repositories?since=' + Math.floor(1 + Math.random() * (1000000 - 1));
      return this.api.get(endPoint).map(res => res.json() as Repository[]).catch(err => Observable.throw(err));
  }

  search(q: string): Observable<any> {
      let endPoint = '/search/repositories?q=' + q;
      return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getRepository(repos: string): Observable<Repository> {
      let endPoint = 'repos/' + repos;
      return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));
  }
}
