/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { LoadingService } from '../../../app/services/loading.service';
 import { Observable } from 'rxjs';
 import { environment } from './../../../environments/environment';

 @Component({
   selector: 'table-login',
   styleUrls: ['./login.component.scss'],
   templateUrl: './login.component.html'
 })
 export class NbLoginComponent implements OnInit {
   redirectDelay = 0;
   showMessages: any = {};
   strategy = '';
   errors: string[] = [];
   messages: string[] = [];
   user: any = {
    name: '',
    password: ''
   };
   submitted = false;
//    socialLinks: NbAuthSocialLink[] = [];
   rememberMe = false;
   loading$: Observable<string> = this.loadingService.subject.asObservable();
   strMsg: any = '';
   apiUrl = environment.apiUrl;
   constructor(
               protected cd: ChangeDetectorRef,
               protected router: Router,
               private loadingService: LoadingService,
               private http: HttpClient) {}

    ngOnInit(): void {
    this.loading$.subscribe(
      (value: string) => { this.strMsg = value; }
    );
  }
   login(): void {
    //  if (this.user.name === '15821948366' && this.user.password === '121107') {
    //     localStorage.setItem('user_name', 'yangmu');
    //     this.router.navigate(['/home']);
    //  }
    this.showLoading('登陆中。。。');
    this.authUserFn(this.user.name, this.user.password);
   }

   hideLoading(): void {
    this.loadingService.unsetLoading();
  }

  showLoading(strMessage: string): void {
    this.loadingService.setLoading(strMessage);
  }

   // 登陆验证
  async authUserFn(id: any, password: any) {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
    };
    await this.http.post(`${this.apiUrl}auth`, {id, password}, httpOptions).subscribe((res: any) => {
      // await this.http.post(`api/auth`, {id, password}, httpOptions).subscribe((res: any) => {
      console.log('auth_log', res);
      if (res.res) {
        this.hideLoading();
        localStorage.setItem('user_name', res.user.name);
        localStorage.setItem('token', `Bearer ${res.user.token}`);
        this.router.navigate(['/home']);
      }else {
        this.hideLoading();
        alert(`登陆失败！！！`);
      }
    }, (error) => {
      this.hideLoading();
      console.log('error', error.error.err);
      alert(`登陆失败！！！${error.error.err}`);
    });
  }
 }
