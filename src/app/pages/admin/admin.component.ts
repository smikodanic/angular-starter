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
  msg: string = '';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    @Inject('API') private API: any,
  ) {
    this.loggedUser = authService.getLoggedUserInfo();
    console.log('loggedUser::', this.loggedUser);
  }

  ngOnInit() {
  }


  logout() {
    console.log('LOGOUT');
    this.authService.logout();
  }


  testAdminEndpoint() {
    this.httpClient.get(this.API.ADMIN.test)
      .subscribe({
        next: (apiRes: any) => {
          console.log(apiRes);
          this.msg = apiRes.msg;
        },
        error: err => {
          this.msg = err.error.message;
          console.error(err);
        }
      });
  }

}
