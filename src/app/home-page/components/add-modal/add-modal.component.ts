import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
})
export class AddModalComponent implements OnDestroy {
  private aSub: Subscription = new Subscription();
  private userID = localStorage.getItem('userID');

  public addForm = this.fb.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur',
      },
    ],
    description: [
      '',
      {
        validators: [Validators.required, Validators.minLength(10)],
        updateOn: 'blur',
      },
    ],
    priority: ['', [Validators.required]],
    isDone: ['false', [Validators.required]],
    dueDate: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: ModalService,
    private dialogRef: MatDialogRef<AddModalComponent>
  ) {}

  onSubmit() {
    if (!this.userID) {
      this.userID = '';
    }

    this.aSub.add(
      this.httpService
        .addTask(this.addForm.value, this.userID)
        .subscribe((b: any) => {
          if (b.status === 'Ok') {
            this.close();
          }
        })
    );
  }

  close() {
    if (!this.userID) {
      this.userID = '';
    }

    this.aSub.add(
      this.httpService
        .getTasks(this.userID)
        .subscribe((b) => this.dialogRef.close({ task: b }))
    );
  }

  get title() {
    return this.addForm.controls['title'];
  }
  get description() {
    return this.addForm.controls['description'];
  }
  get priority() {
    return this.addForm.controls['priority'];
  }
  get isDone() {
    return this.addForm.controls['isDone'];
  }
  get dueDate() {
    return this.addForm.controls['dueDate'];
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe();
  }
}
