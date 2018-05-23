import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { ChoreService } from '../chores/chore.service';
import { Chore } from '../chores/chore';

@Component({
  selector: 'app-chore-detail',
  templateUrl: './chore-detail.component.html',
  styleUrls: ['./chore-detail.component.scss']
})

export class ChoreDetailComponent implements OnInit {
  constructor(
    private choreService: ChoreService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  @Input() chore: Chore;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.choreService.getChore(params.get('id')))
      .subscribe(chore => this.chore = chore);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.choreService.update(this.chore)
        .then(() => this.goBack());
  }
}
