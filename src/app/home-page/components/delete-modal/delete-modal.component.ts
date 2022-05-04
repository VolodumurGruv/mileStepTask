import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  private data!: [number, Task];
  public task!: Task;

  constructor(
    private httpService: ModalService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
    this.task = data[1];
  }

  ngOnInit(): void {}

  deleteTask() {
    if (this.task._id) {
      this.httpService.deleteTask(this.task._id).subscribe();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
