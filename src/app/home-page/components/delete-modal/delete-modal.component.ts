import { Component, DoCheck, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit, DoCheck {
  private data!: [number, Task];
  public task!: Task;

  private oldData!: Task;

  constructor(
    private httpService: ModalService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
    this.task = data[1];
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    console.log('do check delete');
    if (this.data[1] !== this.oldData) {
      console.log('delete not equal do check');
    }
  }

  deleteTask() {
    if (this.task._id) {
      this.httpService.deleteTask(this.task._id).subscribe((b: any) => {
        if (b.status === 'Ok') {
          this.close();
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
