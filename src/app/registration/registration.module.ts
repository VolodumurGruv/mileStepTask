import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    SignupComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RegistrationRoutingModule,
  ],
})
export class RegistrationModule {}
