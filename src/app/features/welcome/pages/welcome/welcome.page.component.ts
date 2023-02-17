import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ButtonType, getCssLikeValue } from 'ngx-sfc-common';
import { map, Observable } from 'rxjs';
import { HeaderService } from 'src/app/core/components/header/services/header.service';
import { WelcomePageConstants } from './welcome.page.constants';

@Component({
  templateUrl: './welcome.page.component.html',
  styleUrls: ['./welcome.page.component.scss']
})
export class WelcomePageComponent implements AfterViewInit {

  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  ButtonType = ButtonType;
  Constants = WelcomePageConstants;

  constructor(private headerService: HeaderService, private changeDetectorRef: ChangeDetectorRef) { }

  public heroTitleTop$!: Observable<string>;

  ngAfterViewInit() {
    this.heroTitleTop$ = this.headerService.height$?.pipe(map(height => getCssLikeValue(height)));
    this.changeDetectorRef.detectChanges();
  }
}
