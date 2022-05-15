import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  OnInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ModalComponent } from '../modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { UpdateTaskService } from 'src/app/services/update-task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [UpdateTaskService],
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() public task!: TemplateRef<TaskItemComponent>;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  public viewContainerRef!: ViewContainerRef;

  @HostListener('click') onClick() {
    this.addTemplate(this.task);
  }

  public tasks!: Task[];

  constructor(
    public matDialog: MatDialog,
    private httpService: ModalService,
    private updateTask: UpdateTaskService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      console.log(change);
    }
  }

  ngOnInit(): void {
    this.httpService.getTasks().subscribe((b) => (this.tasks = b));
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
    matConfig.width = 'auto';
    matConfig.data = [id, this.tasks[id]];
    matConfig.disableClose = true;

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
    if (name === 'delete') {
      this.openDialog(id, DeleteModalComponent);
    }
  }
}
