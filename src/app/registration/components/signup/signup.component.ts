import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<SignupComponent>,
    private fb: FormBuilder
  ) {}

  public signupForm = this.fb.group({
    userName: [''],
    email: [''],
    pass: [''],
    confirm: [''],
  });

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupForm.value);
    this.close();
  }

  close() {
    this.matDialogRef.close();
  }
}
