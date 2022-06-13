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
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  login() {
    const loginMatDialog = this.matDialog.open(LoginComponent, {
      disableClose: true,
    });
  }

  signup() {
    const loginMatDialog = this.matDialog.open(SignupComponent, {
      // disableClose: true,
    });
  }
}
