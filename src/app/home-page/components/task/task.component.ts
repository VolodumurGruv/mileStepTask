import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ModalComponent } from '../modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public task!: TemplateRef<TaskItemComponent>;
  @Input() public tasks!: Task[];

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  public viewContainerRef!: ViewContainerRef;

  @HostListener('click') onClick() {
    this.addTemplate(this.task);
  }

  constructor(public matDialog: MatDialog, private httpService: ModalService) {}

  ngOnInit(): void {
    this.tasks = [];
    this.getTasks();
  }

  private getTasks() {
    let userID = localStorage.getItem('userID');

    if (!userID) {
      userID = '';
    }

    this.httpService.getTasks(userID).subscribe((b: Task[]) => {
      if (Array.isArray(b)) {
        console.log('is array');

        this.tasks = b;
      }
    });
  }

  private addTemplate(temp: TemplateRef<any>): void {
    if (temp) {
      this.viewContainerRef.createEmbeddedView(temp);
    }
  }

  openDialog(id: number, componentIs: any) {
    const matConfig = new MatDialogConfig();

    matConfig.id = id.toString();
    matConfig.height = 'auto';
    matConfig.minWidth = '700px';
    matConfig.data = [id, this.tasks[id]];
    matConfig.disableClose = true;

    const matDialogOpen = this.matDialog.open(componentIs, matConfig);

    matDialogOpen.afterClosed().subscribe((b) => {
      if (b) {
        this.tasks = b.task;
      }
    });
  }

  openTask(id: number, name: string) {
    if (name === 'task') {
      this.openDialog(id, ModalComponent);
    }
  }

  editTask(id: number, name: string) {
    if (name === 'edit') {
      this.openDialog(id, EditModalComponent);
    }
  }

  deleteTask(id: number, name: string) {
    if (name === 'delete') {
      this.openDialog(id, DeleteModalComponent);
    }
  }
}
