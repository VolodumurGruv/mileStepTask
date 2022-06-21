import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  login() {
    this.matDialog.open(LoginComponent, {
      disableClose: true,
      width: '27rem',
      height: '15rem',
    });
  }

  signup() {
    this.matDialog.open(SignupComponent, {
      disableClose: true,
      width: '27rem',
      height: '23rem',
    });
  }
}
