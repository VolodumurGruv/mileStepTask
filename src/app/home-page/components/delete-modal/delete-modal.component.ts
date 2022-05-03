import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Task} from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  private data!: [number, Task];
  public task!: Task;

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
    this.task = data[1];
  }

  ngOnInit(): void {}

  deleteTask() {
    console.log(this.task);
  }

  close() {
    this.dialogRef.close();
  }
}
