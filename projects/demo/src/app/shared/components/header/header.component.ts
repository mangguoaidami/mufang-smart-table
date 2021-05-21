import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExcelService } from './../../../services/sharedServices';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(protected router: Router, private http: HttpClient, private excelService: ExcelService){}

  @Input() tagline = '';

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  exportexcel(): void {
    console.log('all');
    this.getConfig();
  }

  // 获取list列表
  getConfig() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
    };
    this.http.post(`api/firstApp/studentInfo/list`, {}, httpOptions).subscribe((res: {
      code: number,
      data: any
    }) => {
      if (res.code === 200) {
        console.log('all--', res.data);
        this.excelService.exportAsExcelFile(res.data, 'students');
      }
    });
  }

}
