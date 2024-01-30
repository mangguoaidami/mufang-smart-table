import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as studentsExport from './../../../assets/data/students_export.json';
import * as studList from './../../../assets/data/stud_list.json';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  constructor(private http: HttpClient) {
    const studArr: any[] = JSON.parse(JSON.stringify(studentsExport)).default;
    const studListArr: any[] = JSON.parse(JSON.stringify(studList)).default;
    // 获取格式化后的数据
    const arr = studArr.map((item: any) => {
      item.recorderLists = (item.recorderLists && item.recorderLists.split('/').length > 0) ? item.recorderLists.split('/').filter((v) => {
        if (v) {
          return true;
        }else {
          return false;
        }
      }).map(x => {
        if (x) {
          return new Date(x);
        }else {
          return null;
        }
      }) : [];
      return item;
    });
    // console.log('datadata', JSON.stringify(arr));
    // 检查原始数据
    const newArr: any[] = studListArr.map((item, index) => {
      const str = String(index).padStart(3, '0');
      item.ERPID = `MF${str}`;
      return item;
    });
    console.log('datadata', JSON.stringify(newArr));
  }

  snippets = {
    install: require('raw-loader!./snippets/install.md').default,
    require: require('raw-loader!./snippets/require.md').default,
    directive: require('raw-loader!./snippets/directive.md').default,
    settings: require('raw-loader!./snippets/settings.md').default,
    template: require('raw-loader!./snippets/template.md').default,
    array: require('raw-loader!./snippets/array.md').default,
    dataTemplate: require('raw-loader!./snippets/data-template.md').default,
    basicFull: require('raw-loader!./snippets/basic-full.md').default,
    // studentsExport: require('raw-loader!./data/students_export.json'),
  };

}
