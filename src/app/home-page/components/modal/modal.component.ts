import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Task } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
  public tasks!: Task[];
  public task!: Task[];

  private aSub: Subscription = new Subscription();

  constructor(
    private httpService: ModalService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    let userID = localStorage.getItem('userID');

    if (!userID) {
      userID = '';
    }

    this.aSub.add(
      this.httpService
        .getTasks(userID)
        .subscribe((t) => (this.task = t.filter((_, i) => i === data[0])))
    );
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.aSub.add(this.dialogRef.beforeClosed().subscribe());
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe();
  }
}
