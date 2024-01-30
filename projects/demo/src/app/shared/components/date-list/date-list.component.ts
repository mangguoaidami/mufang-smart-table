import {Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { DefaultFilter } from 'ng2-smart-table';
// import { BasicExampleDataComponent } from './../basic-example/basic-example-data.component';
@Component({
  selector: 'date-list',
  templateUrl: './date-list.component.html',
  styleUrls: ['./date-list.component.scss'],
})
export class DateListComponent implements OnInit {
    renderValue: string;
    @Input() rowData: any;
    dateLists: any[] = [];

    ngOnInit() {
        this.dateLists = this.rowData.recorderLists;
        // console.log('rowData', this.rowData.recorderLists);
    }
  }
