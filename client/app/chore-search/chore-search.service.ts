import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Chore } from '../chores/chore';

@Injectable()
export class ChoreSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Chore[]> {
    return this.http
               .get(`api/chores/?name=${term}`)
               .map(response => response.json().data as Chore[]);
  }
}
