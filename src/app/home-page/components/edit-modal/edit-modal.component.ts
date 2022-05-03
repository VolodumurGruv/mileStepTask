import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  public select: number[] = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: [number, Task]
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    this.select = this.select.filter((item) => item !== this.data[1].priority);

    this.editForm = this.fb.group({
      title: [this.data[1].title],
      description: [this.data[1].description],
      priority: [this.data[1].priority],
      isDone: [this.data[1].isDone],
      dueDate: [this.data[1].dueDate],
    });
  }

  onSubmit() {
    console.log(this.editForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
