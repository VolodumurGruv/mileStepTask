import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.authService.singin(this.loginForm.value);

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
    this.close();
  }

  close() {
    this.matDialogRef.close();
  }
}
