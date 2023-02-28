import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, Direction } from 'ngx-sfc-common';
import { SliderType } from 'ngx-sfc-components';
import { RegistrationPageConstants } from './registration.page.constants';

@Component({
  selector: 'sfc-registration.page',
  templateUrl: './registration.page.component.html',
  styleUrls: ['../base/base-identity.page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  ButtonType = ButtonType;
  Direction = Direction;
  SliderType = SliderType;

  Constants = RegistrationPageConstants;

  public registrationForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userNameEmail: ['', Validators.required],
      password: ['']
    });
  }

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    console.info(this.registrationForm.value);
  }
}
