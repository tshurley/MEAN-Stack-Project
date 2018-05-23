import { Component, OnInit } from '@angular/core';

import { Chore } from '../chores/chore';
import { ChoreService } from '../chores/chore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    chores: Chore[] = [];

    constructor(private choreService: ChoreService) {}

    ngOnInit(): void {
        this.choreService.getChores()
            .then(chores => this.chores = chores.slice(0, 4));
    }
}
