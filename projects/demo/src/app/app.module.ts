import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <--追加
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { LOCALE_ID } from '@angular/core';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';


import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ScrollPositionDirective } from './theme/directives/scrollPosition.directive';
import { ExcelService } from './services/sharedServices';

// registerLocaleData(zh); // <--中文Date字符
@NgModule({
  declarations: [
    AppComponent,
    ScrollPositionDirective,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    Ng2SmartTableModule,
    PagesModule,
    MatProgressSpinnerModule, // <--追加
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
  ],
  providers: [
    ExcelService, DatePipe,
    //  {provide: LOCALE_ID, useValue: 'zh' } // <--中文Date字符
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
