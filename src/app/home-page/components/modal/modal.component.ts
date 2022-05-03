import { Component, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tasks } from 'src/app/temporary/task';
import { Task } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnDestroy {
  public tasks: Task[] = tasks;
  public task!: Task[];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.task = this.tasks.filter((item, i) => i === data[0]);
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {}
}
