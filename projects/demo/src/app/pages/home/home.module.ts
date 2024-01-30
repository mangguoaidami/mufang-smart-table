import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { routes } from './home.routes';

import { HomeComponent } from './home.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';     // add

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressSpinnerModule,   // add
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
