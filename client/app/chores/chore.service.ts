import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Chore } from './chore';

@Injectable()
export class ChoreService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getChores(): Promise<Chore[]> {
        const url = `/api/chores`;
        return this.http.get(url)
               .toPromise()
               .then(response => response.json() as Chore[])
               .catch(this.handleError);
    }

    getChore(id): Promise<Chore> {
        const url = `/api/chore/${id}`;
        return this.http.get(url)
                   .toPromise()
                   .then(response => response.json() as Chore)
                   .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    create(name: string): Promise<Chore> {
        const url = `/api/chore`;
        return this.http
            .post(url, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Chore)
            .catch(this.handleError);
    }

    update(chore: Chore): Promise<Chore> {
        const url = `/api/chore/${chore._id}`;
        return this.http
            .put(url, JSON.stringify(chore), {headers: this.headers})
            .toPromise()
            .then(() => chore)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
    const url = `/api/chore/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
