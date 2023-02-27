import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg1: string;
  msg2: string;

  constructor(
    private httpClient: HttpClient,
    @Inject('API') private API: any,
  ) { }

  ngOnInit() {
  }


  testAdminEndpoint() {
    this.httpClient.get(this.API.ADMIN.test)
      .subscribe({
        next: (apiRes: any) => {
          console.log(apiRes);
          this.msg1 = apiRes.msg;
        },
        error: err => {
          this.msg1 = err.error.message;
          console.error(err);
        }
      });
  }


  testCustomerEndpoint() {
    this.httpClient.get(this.API.CUSTOMER.test)
      .subscribe({
        next: (apiRes: any) => {
          console.log(apiRes);
          this.msg2 = apiRes.msg;
        },
        error: err => {
          this.msg2 = err.error.message;
          console.error(err);
        }
      });
  }


}
