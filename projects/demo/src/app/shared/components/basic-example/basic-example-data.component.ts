import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from './../../../../environments/environment';
import { environment } from './../../../../environments/environment';
import { CustomRenderComponent } from './../../../pages/examples/custom-edit-view/custom-render.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { LoadingService } from '../../../services/loading.service';
import { Observable } from 'rxjs';
import {MatCalendar, MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { DateListComponent } from './../date-list/date-list.component';
import {PageEvent} from '@angular/material/paginator';



@Component({
  selector: 'basic-example-data',
  templateUrl: './basic-example-data.component.html',
  styleUrls: ['./basic-example-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // standalone: true,
  // imports: [MatButtonModule],
})
export class BasicExampleDataComponent implements OnInit {
  // @ViewChild('calendar')
  // calendar;
  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
  constructor(private http: HttpClient, private loadingService: LoadingService, public dialog: MatDialog) { }
  public data = [];
  apiUrl = environment.apiUrl;
  public showUserDetail: {
    ERPID?: string,
    name?: string,
    hasNum?: number,
    validity?: string,
    didNum?: number,
    joiningYear?: number,
    coruseTagName?: string,
    recorderLists?: any[],
    division?: string,
    courseTagName?: string,
  } = {};
  loading$: Observable<string> = this.loadingService.subject.asObservable();
  daysSelected: any[] = [];
  event: any;
  length = 100;
  pageSize = 10;
  page = 1;
  // MatPaginator Output
  pageEvent: PageEvent;
  public searchName = '';

  // 签到记录
  settings = {
    add: {
      confirmCreate: true,
      inputClass: 'add_input',
      // addButtonContent: '保存',
      createButtonContent: '保存',
      cancelButtonContent: '取消'
    },
    edit: {
      confirmSave: true,
      saveButtonContent: '保存',
      cancelButtonContent: '取消',
    },
    delete: {
      confirmDelete: true,
      // deleteButtonContent: 'Delete data',
      // saveButtonContent: 'save',
      // cancelButtonContent: 'cancel'
    },
    columns: {
      ERPID: {
        title: 'ERPID',
        editable: false,
        // hide: true
      },
      name: {
        title: '姓名',
      },
      // wechat: {
      //   title: '微信号',
      // },
      // coursesOpted: {
      //   title: '课程名称',
      // },
      // cardPurchaseCategory: {
      //   title: '购买卡类别',
      //   editable: false
      // },
      courseTagName: {
        title: '课程名称',
      },
      hasNum: {
        title: '总共课次',
      },
      validity: {
        title: '有效时段'
      },
      didNum: {
        title: '已用课次',
      },
      joiningYear: {
        title: '加入时间',
        // width: '500px'
      },
      recorderLists: {
        title: '签到记录',
        editable: false,
        type: 'custom',
        renderComponent: DateListComponent
      },
    },
    // pager: {
    //   display: true,
    //   page: 1,
    //   perPage: 5,
    // },
  };
// 缴费记录
  settingsFree = {
    add: {
      confirmCreate: true,
      inputClass: 'add_input',
      // addButtonContent: '保存',
      createButtonContent: '保存',
      cancelButtonContent: '取消'
    },
    edit: {
      confirmSave: true,
      saveButtonContent: '保存',
      cancelButtonContent: '取消',
    },
    delete: {
      confirmDelete: true,
      // deleteButtonContent: 'Delete data',
      // saveButtonContent: 'save',
      // cancelButtonContent: 'cancel'
    },
    columns: {
      id: {
        title: 'ID',
        editable: false,
        // hide: true
      },
      name: {
        title: '姓名',
      },
      wechat: {
        title: '微信号',
      },
      phone: {
        title: '联系电话',
      },
      hasTheDate: {
        title: '缴费记录',
        // width: '500px',
        type: 'custom',
        class: 'custom',
        renderComponent: CustomRenderComponent
        // hide: true
        // valuePrepareFunction: (cell, row) => row.hasTheDate
      }
    },
  };

  ngOnInit() {
    this.getStudentList(1, 10);
  }

  hideLoading(): void {
    this.loadingService.unsetLoading();
  }

  showLoading(strMessage: string): void {
    this.loadingService.setLoading(strMessage);
  }

  dateToString(value): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const yyyymmdd = `${year}-${month}-${day}`;
    console.log(yyyymmdd);
    return(yyyymmdd);
  }

  searchByName(): void {
    console.log('searchName', this.searchName);
    this.getStudentList(1, 10, this.searchName);
  }

  resetName(): void {
    this.searchName = '';
    this.getStudentList(1, 10);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.page = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    console.log('pageEvent', pageEvent);
    this.getStudentList(pageEvent.pageIndex + 1, pageEvent.pageSize);
  }

  // 刷新list列表
  reloadStudentList(): void {
    this.getStudentList(1, 10);
  }

  // 获取list列表
  getStudentList(page = 1, limit = 10, name = '') {
    this.showLoading('学生列表加载中。。。');
    const httpOptions: any = {
      // headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
        // name: 'sasa'
    };
    this.http.get(`${this.apiUrl}student/list?limit=${limit}&page=${page}&name=${name}`, httpOptions)
    .subscribe((res: any) => {
      // console.log('获取学生列表', res);
      if (res.res) {
        this.data = res.res.data;
        this.length = res.res.totalPages * this.pageSize;
        this.hideLoading();
      }
    }, (error) => {
      this.hideLoading();
      console.log('error', error.error.err);
      alert(`获取学生列表失败！！！${error.error.err}`);
    });
  }

  // 新增学生
  addRow(event): void {
    this.showLoading('新增中。。。');
    this.http.post(`${this.apiUrl}student/create`, event.newData).subscribe((res: any) => {
      if (res.res) {
        this.hideLoading();
        alert('添加成功！');
        this.getStudentList(1, 10);
        // event.confirm.resolve(event.newData);
      }
    }, (error) => {
      this.hideLoading();
      event.confirm.reject();
      alert(`添加失败！！！请确认填写数据：${error.error.message}`);
    });
  }

  // 删除学生
  deleteFn(event): void {
    this.showLoading('删除中。。。');
    console.log('event', event);

    if (confirm(`真的要删除${event.data.name}吗?`)) {
      this.http.delete(`${this.apiUrl}student/delete/${event.data._id}`).subscribe((res: any) => {
        this.hideLoading();
        alert('删除成功！');
        this.getStudentList(1, 10);
      });
    }
    else {
      this.hideLoading();
      alert('点击了取消按钮');
    }
  }

  // 编辑学生
  editeRow(event): void {
    this.showLoading('提交中。。。');
    // console.log('editeRow', event);
    // createTimeStr updateTimeStr
    this.http.post(`${this.apiUrl}student/update/${event.newData._id}`, event.newData).subscribe((res: any) => {
      if (res.res) {
        alert('编辑成功！');
        this.getStudentList(1, 10);
      }
      // this.hideLoading();
    }, (error) => {
      this.hideLoading();
      alert(`编辑失败！！！请确认填写数据：${error.error.message}`);
    });
  }

  formatDate(date: any): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

  // 点击当前tabel行
  rowSelectFn(event): void {
    const recorderListsArr = this.sortDateArr(event.data.recorderLists);
    this.showUserDetail = event.data;
    this.showUserDetail.recorderLists = recorderListsArr;
    this.daysSelected = event.data.recorderLists;
    // console.log('daysSelected', this.daysSelected);
  }

  // sort date array
  sortDateArr(arr): any[] {
    return arr.sort((a, b) => {
      return (new Date(a) as any) - (new Date(b) as any);
    });
  }

  // 点击按钮
  clickCalendarBtn(): void {
    console.log('选择日期');
    this.calendar.updateTodaysDate(); // 同步日历组件数据
  }

  isSelected = (event: any) => {
    return this.daysSelected.find((x: any) => {
      return this.formatDate(x) === this.formatDate(event);
    }) ? 'selected' : null;
  }

  // 日历选择日期
  select(event: any, calendar: any) {
    // const date =
    //   event.getFullYear() +
    //   '-' +
    //   ('00' + (event.getMonth() + 1)).slice(-2) +
    //   '-' +
    //   ('00' + event.getDate()).slice(-2);
    console.log('eventevent', event);
    // tslint:disable-next-line:no-debugger
    // debugger;
    const index = this.daysSelected.findIndex(x => this.formatDate(x) === this.formatDate(event));
    if (index < 0) { this.daysSelected.push(event); }
    else { this.daysSelected.splice(index, 1); }
    calendar.updateTodaysDate();
    console.log('daysSelected', this.daysSelected);
  }

  // 保存日期
  saveThisCalendar(): void {
    this.editeRow({newData: this.showUserDetail});
  }
}
