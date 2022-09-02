import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { ModalService } from 'src/app/services/modal.service';
import { UpdateTaskService } from 'src/app/services/update-task.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  providers: [UpdateTaskService],
})
export class DeleteModalComponent implements OnDestroy {
  private data!: [number, Task];
  public task!: Task;
  private aSub: Subscription = new Subscription();

  constructor(
    private updateTask: UpdateTaskService,
    private httpService: ModalService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
    this.task = data[1];
  }

  deleteTask() {
    if (this.task._id) {
      this.aSub.add(
        this.httpService.deleteTask(this.task._id).subscribe((b: any) => {
          if (b.status === 'Ok' && this.task._id) {
            this.update(this.task._id);
            this.close();
          }
        })
      );
    }
  }

  update(id: string) {
    this.updateTask.updatedTask(id);
  }

  close() {
    let userID = localStorage.getItem('userID');

    if (!userID) {
      userID = '';
    }

    this.aSub.add(
      this.httpService.getTasks(userID).subscribe((b) => {
        this.dialogRef.close({ task: b });
      })
    );
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe();
  }
}
