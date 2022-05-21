import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public tasks!: Task[];
  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  addTask() {
    const matDialogOpen = this.matDialog.open(AddModalComponent, {
      disableClose: true,
    });

    matDialogOpen.afterClosed().subscribe((b) => {
      if (b) {
        this.tasks = b.task;
      }
    });
  }
}
