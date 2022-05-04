import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
})
export class AddModalComponent {
  public addForm = this.fb.group({
    title: [''],
    description: [''],
    priority: [''],
    isDone: [''],
    dueDate: [''],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddModalComponent>,
    private httpService: ModalService
  ) {}

  onSubmit() {
    this.httpService.addTask(this.addForm.value).subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
