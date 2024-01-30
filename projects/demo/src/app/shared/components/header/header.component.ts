import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExcelService } from './../../../services/sharedServices';
import { LoadingService } from '../../../services/loading.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // tslint:disable-next-line:max-line-length
  constructor(protected router: Router, private http: HttpClient, private excelService: ExcelService, private loadingService: LoadingService){}
  apiUrl = environment.apiUrl;

  @Input() tagline = '';

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loading(): void {
    this.showLoading('loading');
    setTimeout(() => {
      this.hideLoading();
    }, 2000);
  }

  hideLoading(): void {
    this.loadingService.unsetLoading();
  }

  showLoading(strMessage: string): void {
    this.loadingService.setLoading(strMessage);
  }

  exportexcel(): void {
    console.log('all');
    // this.getConfig();
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
