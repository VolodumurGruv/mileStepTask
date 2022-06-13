import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder
  ) {}

  public loginForm = this.fb.group({
    email: [''],
    pass: [''],
  });

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.loginForm.value);
    this.close();
  }

  close() {
    this.matDialogRef.close();
  }
}
