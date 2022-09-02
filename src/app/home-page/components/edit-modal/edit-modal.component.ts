import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnDestroy {
  public data!: [number, Task];
  public editForm!: FormGroup;

  public select: number[] = [1, 2, 3, 4, 5];

  private aSub: Subscription = new Subscription();

  constructor(
    private httpService: ModalService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    this.select = this.select.filter((item) => item !== this.data[1].priority);

    this.editForm = this.fb.group({
      title: [
        this.data[1].title,
        {
          validators: [Validators.required, Validators.minLength(5)],
          updateOn: 'blur',
        },
      ],
      description: [
        this.data[1].description,
        {
          validators: [Validators.required, Validators.minLength(10)],
          updateOn: 'blur',
        },
      ],
      priority: [this.data[1].priority, [Validators.required]],
      isDone: [this.data[1].isDone, [Validators.required]],
      dueDate: [this.data[1].dueDate, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.data[1]._id) {
      this.aSub.add(
        this.httpService
          .editTask(this.data[1]._id, this.editForm.value)
          .subscribe((b: any) => {
            if (b.status === 'Ok') {
              this.close();
            }
          })
      );
    }
  }

  close() {
    let userID = localStorage.getItem('userID');

    if (!userID) {
      userID = '';
    }

    this.aSub.add(
      this.httpService
        .getTasks(userID)
        .subscribe((b) => this.dialogRef.close({ task: b }))
    );
  }

  get title() {
    return this.editForm.controls['title'];
  }
  get description() {
    return this.editForm.controls['description'];
  }
  get priority() {
    return this.editForm.controls['priority'];
  }

  get dueDate() {
    return this.editForm.controls['dueDate'];
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe();
  }
}
