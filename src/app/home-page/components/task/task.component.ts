import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  Optional,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { tasks } from 'src/app/temporary/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() public task!: TemplateRef<TaskItemComponent>;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  public viewContainerRef!: ViewContainerRef;

  @HostListener('click') onClick() {
    this.addTemplate(this.task);
  }

  public tasks: Task[] = tasks;

  constructor(
    public matDialog: MatDialog,
    @Optional() private parent: TaskItemComponent
  ) {}

  private addTemplate(temp: TemplateRef<any>): void {
    if (temp) {
      this.viewContainerRef.createEmbeddedView(temp);
    }
  }

  openDialog(id: number) {
    const matConfig = new MatDialogConfig();

    matConfig.id = 'dialog-task';
    matConfig.height = 'auto';
    matConfig.width = 'auto';
    matConfig.data = id;

    const matDialogOpen = this.matDialog.open(ModalComponent, matConfig);
  }

  editTask() {
    console.log('edit');
  }

  deleteTask() {
    console.log('delete');
  }
}
