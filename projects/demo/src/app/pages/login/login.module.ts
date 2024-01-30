import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { routes } from './login.routes';

import { NbLoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';     // add

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    NbLoginComponent,
  ],
})
export class LoginModule { }
