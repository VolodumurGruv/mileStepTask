import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<SignupComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  public signupForm = this.fb.group({
    userName: [''],
    email: [''],
    password: [''],
    confirm: [''],
    confirmedAt: [new Date()],
  });

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupForm.value);
    const { userName, email, password, confirmedAt }: User = {
      ...this.signupForm.value,
    };

    this.authService
      .signup(this.signupForm.value)
      .subscribe((b) => console.log(b));
    this.close();
  }

  close() {
    this.matDialogRef.close();
  }
}
