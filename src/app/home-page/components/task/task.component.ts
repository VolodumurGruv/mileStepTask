import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ModalComponent } from '../modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { SortComponent } from '../sort/sort.component';

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

  @ViewChild(SortComponent) private sorted!: SortComponent;

  @HostListener('click') onClick() {
    this.addTemplate(this.task);
  }

  private currentSelect: string = 'isDone';

  public taskPriority: string[] = ['red', 'orange', 'green', 'blue', 'black'];

  constructor(public matDialog: MatDialog, private httpService: ModalService) {}

  ngOnInit(): void {
    this.tasks = [];
    this.getTasks();
  }

  private getTasks(): void {
    let userID = localStorage.getItem('userID');

    if (!userID) {
      userID = '';
    }

    this.httpService.getTasks(userID).subscribe((b: Task[]) => {
      if (Array.isArray(b)) {
        this.tasks = b.sort((a: any, b: any) =>
          this.sort(a[this.currentSelect], b[this.currentSelect])
        );
      }
    });
  }

  private addTemplate(temp: TemplateRef<any>): void {
    if (temp) {
      this.viewContainerRef.createEmbeddedView(temp);
    }
  }

  private openDialog(id: number, componentIs: any) {
    const matConfig = new MatDialogConfig();

    matConfig.id = id.toString();
    matConfig.height = 'auto';
    matConfig.minWidth = '700px';
    matConfig.data = [id, this.tasks[id]];
    matConfig.disableClose = true;

    const matDialogOpen = this.matDialog.open(componentIs, matConfig);

    matDialogOpen.afterClosed().subscribe((b) => {
      if (b) {
        this.tasks = b.task.sort((a: any, b: any) =>
          this.sort(a[this.currentSelect], b[this.currentSelect])
        );
      }
    });
  }

  public openTask(id: number, name: string): void {
    if (name === 'task') {
      this.openDialog(id, ModalComponent);
    }
  }

  public editTask(id: number, name: string): void {
    if (name === 'edit') {
      this.openDialog(id, EditModalComponent);
    }
  }

  public deleteTask(id: number, name: string): void {
    if (name === 'delete') {
      this.openDialog(id, DeleteModalComponent);
    }
  }

  public sortTasks(event: string): void {
    this.currentSelect = event;
    this.tasks = this.tasks.sort((a: any, b: any) =>
      this.sort(a[event], b[event])
    );
  }

  private sort(a: any, b: any): number {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }

    return 0;
  }
}
