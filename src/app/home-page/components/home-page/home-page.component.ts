import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnChanges {
  constructor(public matDialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let ch in changes) {
      console.log(changes[ch]);
    }
  }

  ngOnInit(): void {}

  addTask() {
    const matDialogOpen = this.matDialog.open(AddModalComponent);
  }
}
