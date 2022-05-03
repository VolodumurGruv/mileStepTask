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
import { tasks } from 'src/app/temporary/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ModalComponent } from '../modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public task!: TemplateRef<TaskItemComponent>;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  public viewContainerRef!: ViewContainerRef;

  @HostListener('click') onClick() {
    this.addTemplate(this.task);
  }

  public tasks: Task[] = tasks;

  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  private addTemplate(temp: TemplateRef<any>): void {
    if (temp) {
      this.viewContainerRef.createEmbeddedView(temp);
    }
  }

  openDialog(id: number, componentIs: any) {
    const matConfig = new MatDialogConfig();

    matConfig.id = id.toString();
    matConfig.height = 'auto';
    matConfig.width = 'auto';
    matConfig.data = [id, this.tasks[id]];

    const matDialogOpen = this.matDialog.open(componentIs, matConfig);
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
    console.log(id);
    if (name === 'delete') {
      this.openDialog(id, DeleteModalComponent);
    }
  }

  addTask(name: string) {}
}
