import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../core/services/security.service';
import { RegisterModel } from '../core/services/security.models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registerModel: RegisterModel = <RegisterModel>{};

  constructor(private securityService: SecurityService, private router: Router) {
  }

  ngOnInit() {
  }

  registerUser() {
    this.securityService.register(this.registerModel).subscribe(token => {
      this.router.navigate(['/expenses']);
    });
  }
}
