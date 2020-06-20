import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../core/services/security.service';
import { LoginModel } from '../core/services/security.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginModel: LoginModel = <LoginModel>{};

  constructor(private securityService: SecurityService, private router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    this.securityService.login(this.loginModel).subscribe(token => {
      this.router.navigate(['/expenses']);
    });
  }
}
