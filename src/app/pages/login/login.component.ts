import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../ng/modules/ngboost-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFG: FormGroup;
  errMsg: string = '';
  msg: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }


  ngOnInit() {
    this.loginFG = this.fb.group({
      username: '',
      password: ''
    });
  }


  login() {
    const creds = this.loginFG.value; // creds: {username:string, password:string}

    this.authService.login(creds)
      .subscribe({
        next: (apiResp: any) => {
          const jwtToken = this.authService.getJWTtoken();
          console.info('LOGGED USER:: ', apiResp.loggedUser, ' jwtToken=', jwtToken);
          this.msg = apiResp.msg;
        },
        error: err => {
          this.errMsg = err.error.message;
          setTimeout(() => { this.errMsg = ''; }, 2100);
          console.error('ERROR: ', err);
        }
      });

  }


}
