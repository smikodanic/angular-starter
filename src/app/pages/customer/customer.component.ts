import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../ng/modules/ngboost-auth';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  loggedUser: any;
  apiResponse: any;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    @Inject('API') private API: any,
  ) {
    this.loggedUser = authService.getLoggedUserInfo();
  }

  ngOnInit() {
  }


  logout() {
    console.log('LOGOUT');
    this.authService.logout();
  }


  testCustomerEndpoint() {
    this.httpClient.get(this.API.CUSTOMER.test)
      .subscribe(
        apiRes => {
          console.log(apiRes);
          this.apiResponse = apiRes;
        },
        err => {
          console.error(err);
        }
      );
  }

}
