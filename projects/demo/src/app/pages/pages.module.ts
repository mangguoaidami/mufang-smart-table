import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <--追加
import { LoginGuard } from './../shared/author/focusGuard';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import { routes } from './pages.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    CommonModule,
  ],
  providers: [
    LoginGuard
  ]
})
export class PagesModule {
}
