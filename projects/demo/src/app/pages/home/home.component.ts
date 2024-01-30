import { Component, OnInit } from '@angular/core';
import { LoadingService } from './../../services/loading.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loading$: Observable<string> = this.loadingService.subject.asObservable();
  strMsg: any = '';
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loading$.subscribe(
      (value: string) => { this.strMsg = value; }
    );
  }



}
