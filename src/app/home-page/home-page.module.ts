import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { TaskComponent } from './components/task/task.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptor } from '../services/server-interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './components/message/message.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SortComponent } from './components/sort/sort.component';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true },
];

@NgModule({
  declarations: [
    HomePageComponent,
    TaskComponent,
    ModalComponent,
    TaskItemComponent,
    EditModalComponent,
    DeleteModalComponent,
    AddModalComponent,
    FooterComponent,
    MessageComponent,
    SortComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  exports: [TaskComponent],
  providers: [httpInterceptorProviders],
})
export class HomePageModule {}
