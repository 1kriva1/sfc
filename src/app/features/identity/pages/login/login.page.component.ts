import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonType, CheckmarkType, Direction } from 'ngx-sfc-common';
import { SliderType } from 'ngx-sfc-components';
import { LoginPageConstants } from './login.page.constants';

@Component({
  selector: 'sfc-login.page',
  templateUrl: './login.page.component.html',
  styleUrls: ['../base/base-identity.page.component.scss','./login.page.component.scss']
})
export class LoginPageComponent implements OnInit {
  
  ButtonType = ButtonType;
  Direction = Direction;
  SliderType = SliderType;
  CheckmarkType = CheckmarkType;

  Constants = LoginPageConstants;

  public loginForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userNameEmail: ['', Validators.required],
      password: [''],
      remember: [null, Validators.requiredTrue]
    });
  }

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    console.info(this.loginForm.value);
  }
}
