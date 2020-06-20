import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from './shared/angular-material.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CoreModule } from './core/core.module';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'expenses', loadChildren: './expenses/expenses.module#ExpensesModule' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CoreModule,
  ],
  exports: [AngularMaterialModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
