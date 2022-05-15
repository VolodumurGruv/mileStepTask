import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { Task } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
  private data!: [number, Task];
  public tasks!: Task[];
  public task!: Task[];

  constructor(
    private httpService: ModalService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;

    this.httpService
      .getTasks()
      .subscribe((t) => (this.task = t.filter((_, i) => i === data[0])));
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.beforeClosed().subscribe((b) => console.log(b));
    this.dialogRef.close();
  }

  ngOnDestroy(): void {}
}
