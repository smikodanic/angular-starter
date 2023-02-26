import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiResponse: any = {};

  constructor(
    private httpClient: HttpClient,
    @Inject('API') private API: any,
  ) { }

  ngOnInit() {
  }


  testAdminEndpoint() {
    this.httpClient.get(this.API.ADMIN.test)
      .subscribe(
        apiRes => {
          console.log(apiRes);
        },
        err => {
          this.apiResponse = err;
          console.error(err);
        }
      );
  }


  testCustomerEndpoint() {
    this.httpClient.get(this.API.CUSTOMER.test)
      .subscribe(
        apiRes => {
          this.apiResponse = apiRes;
          console.log(apiRes);
        },
        err => {
          this.apiResponse = err;
          console.error(err);
        }
      );
  }

}
