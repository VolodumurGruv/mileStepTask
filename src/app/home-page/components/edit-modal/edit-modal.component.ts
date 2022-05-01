import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public data!: [number, Task];
  public editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.data[1].title],
      description: [this.data[1].description],
      priority: [this.data[1].priority],
      isDone: [this.data[1].isDone],
      dueDate: [this.data[1].dueDate],
    });
  }

  onSubmit() {}

  close() {
    this.dialogRef.close();
  }
}
