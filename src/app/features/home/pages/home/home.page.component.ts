import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/share/services/identity/identity.service';

@Component({
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {

  public userId!: string;

  constructor(private identityService: IdentityService) { }

  ngOnInit(): void {
    this.userId = this.identityService.userId as string;
  }

}
