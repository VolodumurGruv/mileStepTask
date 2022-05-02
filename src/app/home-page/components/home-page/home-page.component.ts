import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  addTask() {
    const matDialogOpen = this.matDialog.open(AddModalComponent);
  }
}
