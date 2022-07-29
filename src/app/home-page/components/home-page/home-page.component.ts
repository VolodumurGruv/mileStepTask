import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/registration/services/auth.service';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public tasks!: Task[];
  constructor(
    public matDialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addTask() {
    const matDialogOpen = this.matDialog.open(AddModalComponent, {
      disableClose: true,
      height: 'auto',
      minWidth: '700px',
    });

    matDialogOpen.afterClosed().subscribe((b) => {
      if (b) {
        this.tasks = b.task;
      }
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/registration']);
  }
}
