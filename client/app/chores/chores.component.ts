import { Component, OnInit } from '@angular/core';
import { Chore } from './chore';
import { ChoreService } from './chore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.scss']
})

export class ChoresComponent implements OnInit {
  chores: Chore[];
  selectedChore: Chore;

  constructor(
    private router: Router,
    private choreService: ChoreService) { }

  getChores(): void {
    this.choreService.getChores().then(chores => this.chores = chores);
  }

  ngOnInit(): void {
    this.getChores();
  }

  onSelect(chore: Chore): void {
    this.selectedChore = chore;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedChore._id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.choreService.create(name)
      .then(chore => {
        this.chores.push(chore);
        this.selectedChore = null;
      });
  }

  delete(chore: Chore): void {
    this.choreService
        .delete(chore._id)
        .then(() => {
          this.chores = this.chores.filter(h => h !== chore);
          if (this.selectedChore === chore) { this.selectedChore = null; }
        });
  }
}

