import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ChoreSearchService } from './chore-search.service';
import { Chore } from '../chores/chore';

@Component({
  selector: 'app-chore-search',
  templateUrl: './chore-search.component.html',
  styleUrls: [ './chore-search.component.scss' ],
  providers: [ChoreSearchService]
})

export class ChoreSearchComponent implements OnInit {
  chores: Observable<Chore[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private choreSearchService: ChoreSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.chores = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.choreSearchService.search(term)
        // or the observable of empty chores if there was no search term
        : Observable.of<Chore[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Chore[]>([]);
      });
  }

  gotoDetail(chore: Chore): void {
    const link = ['/detail', chore._id];
    this.router.navigate(link);
  }
}
