import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../ng/modules/ngboost-auth';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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


  testAdminEndpoint() {
    this.httpClient.get(this.API.ADMIN.test)
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
