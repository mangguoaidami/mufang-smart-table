import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { HeaderComponent } from './components/header/header.component';
import { BasicExampleDataComponent } from './components/basic-example/basic-example-data.component';
import { DateListComponent } from './components/date-list/date-list.component';
import { BasicExampleComponent } from './components/basic-example/basic-example.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';


import {MatFormFieldModule} from '@angular/material/form-field';

import { HighlightCodeDirective } from './directives/highlight.directive';

const SHARED_COMPONENTS = [
  HeaderComponent,
  BasicExampleComponent,
  BasicExampleDataComponent,
  DateListComponent,
];

const SHARED_DIRECTIVES = [
  HighlightCodeDirective,
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    Ng2SmartTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
  ],
})
export class SharedModule { }
