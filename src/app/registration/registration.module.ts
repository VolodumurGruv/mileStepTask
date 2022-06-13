import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, SignupComponent],
  imports: [RegistrationRoutingModule]
})
export class RegistrationModule {}
