import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { CustomRenderComponent } from './../../../pages/examples/custom-edit-view/custom-render.component';

@Component({
  selector: 'basic-example-data',
  template: `
    <div class="container">
    <p>姓名：{{showUserDetail.name}}</p>
    <p>微信：{{showUserDetail.wechat}}</p>
    <p>课程名称：{{showUserDetail.courceName}}</p>
    <p>使用次数：{{showUserDetail.doneTime}}/{{showUserDetail.buyClassTime}}</p>
    <p>使用时间：{{showUserDetail.purchaseTime}}</p>
    <p class="hasTheDate">签到记录：{{showUserDetail.hasTheDate}}</p>
    <ng2-smart-table [settings]="settings" (createConfirm)="addRow($event)" (editConfirm)="editeRow($event)" (deleteConfirm)="deleteFn($event)" (rowSelect)="rowSelectFn($event)" [source]="data"></ng2-smart-table>
    </div>
  `,
  styleUrls: ['./basic-example-data.component.scss'],
})
export class BasicExampleDataComponent implements OnInit {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  public data = [];
  public showUserDetail: {
    name?: string,
    wechat?: string,
    courceName?: string,
    doneTime?: string,
    buyClassTime?: string,
    purchaseTime?: string,
    hasTheDate?: string
  } = {};

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
      courceName: {
        title: '课程名称',
      },
      cardPurchaseCategory: {
        title: '购买卡类别',
        editable: false
      },
      doneTime: {
        title: '已用课次',
      },
      buyClassTime: {
        title: '购买课次',
      },
      purchaseTime: {
        title: '课程使用时间',
        // width: '500px'
      },
      phone: {
        title: '联系电话',
      },
      hasTheDate: {
        title: '签到日期',
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
        this.data = res.data;
      }
    });
  }

  // 新增学生
  addRow(event): void {
    this.http.post('api/firstApp/studentInfo/add', event.newData).subscribe((res: {
      code: number,
      data: any
    }) => {
      if (res.code === 200) {
        this.settings.add.confirmCreate = true;
        alert('添加成功！');
        this.getConfig();
      }
    }, (error) => {
      alert(`添加失败！！！请确认填写数据：${error.error.message}`);
    });
  }

  // 删除学生
  deleteFn(event): void {
    if (confirm('真的要删除吗?')) {
      this.http.post('api/firstApp/studentInfo/delete', { id: event.data.id }).subscribe((res: {
        code: number,
        data: any
      }) => {
        if (res.code === 200) {
          this.getConfig();
        }
      });
    }
    else {
      alert('点击了取消按钮');
    }
  }

  // 编辑学生
  editeRow(event): void {
    delete event.newData.createTime;
    delete event.newData.updateTime;
    delete event.newData.createTimeStr;
    delete event.newData.updateTimeStr;
    // createTimeStr updateTimeStr
    this.http.post('api/firstApp/studentInfo/update', event.newData).subscribe((res: {
      code: number,
      data: any
    }) => {
      if (res.code === 200) {
        alert('编辑成功！');
        this.getConfig();
      }
    }, (error) => {
      alert(`添加失败！！！请确认填写数据：${error.error.message}`);
    });
  }

  rowSelectFn(event): void {
    this.showUserDetail = event.data;
  }
}
