import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { ModalService } from 'src/app/services/modal.service';
import { UpdateTaskService } from 'src/app/services/update-task.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  providers: [UpdateTaskService],
})
export class DeleteModalComponent implements OnInit {
  private data!: [number, Task];
  public task!: Task;
  private tasks!: Task[];

  constructor(
    private updateTask: UpdateTaskService,
    private httpService: ModalService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
    this.task = data[1];
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  deleteTask() {
    if (this.task._id) {
      this.httpService.deleteTask(this.task._id).subscribe((b: any) => {
        if (b.status === 'Ok' && this.task._id) {
          this.update(this.task._id);
          this.close();
        }
      });
    }
  }

  update(id: string) {
    this.updateTask.updatedTask(id);
  }

  close() {
    this.httpService.getTasks().subscribe((b) => {
      this.dialogRef.close({ task: b });
    });
  }
}
