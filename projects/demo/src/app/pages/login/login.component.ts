/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 import { ChangeDetectorRef, Component } from '@angular/core';
 import { Router } from '@angular/router';
 @Component({
   selector: 'table-login',
   styleUrls: ['./login.component.scss'],
   templateUrl: './login.component.html'
 })
 export class NbLoginComponent {
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
   constructor(
               protected cd: ChangeDetectorRef,
               protected router: Router) {}
   login(): void {
     if (this.user.name === '15821948366' && this.user.password === '121107') {
        localStorage.setItem('user_name', 'yangmu');
        this.router.navigate(['/home']);
     }
   }
 }
