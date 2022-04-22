import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { TaskComponent } from './components/task/task.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    HomePageComponent,
    TaskComponent,
    ModalComponent,
    TaskItemComponent,
    EditModalComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [TaskComponent],
})
export class HomePageModule {}
