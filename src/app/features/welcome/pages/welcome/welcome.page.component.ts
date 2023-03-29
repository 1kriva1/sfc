import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCirclePlay, faFutbol, faIdCard, faPeopleGroup, faPersonWalking, faPlus, faSearch, faTruckField, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, getCssLikeValue } from 'ngx-sfc-common';
import { ITimelineItemModel, TimelineItemPosition } from 'ngx-sfc-components';
import { map, Observable } from 'rxjs';
import { HeaderService } from 'src/app/core/components/header/services/header.service';
import { IImageSliderItemModel } from '../../components';

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

  public BUTTON_HERO_SIGN_IN_TEXT = $localize`:@@feature.welcome.page.hero.button-text:Lets start the journey!`;

  public PROCESS_SET_UP: ITimelineItemModel[] = [
    { title: $localize`:@@feature.welcome.page.hero.button-text:Set up journey`, period: true },
    {
      title: $localize`:@@feature.welcome.page.process.schema.set-up.2.title:Sign Up`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.set-up.2.description:Register in application with your credentials or use Google account.`,
      icon: faUserPlus
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.set-up.3.title:Create profile`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.set-up.3.description:In a few second create profile data with brief information about yourself and football skills.`,
      icon: faIdCard
    }
  ];

  public PROCESS_MAIN: ITimelineItemModel[] = [
    { title: $localize`:@@feature.welcome.page.process.schema.main.1.title:Next possibilities`, period: true },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.2.title:Games`,
      position: TimelineItemPosition.Left,
      icon: faFutbol
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.3.title:Find`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.3.description:Find any game that fit your requirements.`,
      icon: faSearch
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.4.title:Create`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.4.description:Create your own game and gather others.`,
      icon: faPlus
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.5.title:Players`,
      position: TimelineItemPosition.Left,
      icon: faPersonWalking
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.6.title:Find`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.6.description:Find players for your game or team.`,
      icon: faSearch
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.7.title:Trainings`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.7.description:Find friends for regular trainings and sparings.`,
      icon: faUserGroup
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.8.title:Teams`,
      position: TimelineItemPosition.Left,
      icon: faPeopleGroup
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.9.title:Find`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.9.description:Find team for regular trainings and sparings.`,
      icon: faSearch
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.10.title:Create`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.10.description:Create your own team.`,
      icon: faPlus
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.11.title:Play`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.11.description:Find and play sparing partners for your team.`,
      icon: faCirclePlay
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.12.title:Fields`,
      position: TimelineItemPosition.Left,
      icon: faTruckField
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.13.title:Find`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.13.description:Register in application with your credentials or use Google account.`,
      icon: faSearch
    },
    {
      title: $localize`:@@feature.welcome.page.process.schema.main.14.title:Add new`,
      position: TimelineItemPosition.Right,
      description: $localize`:@@feature.welcome.page.process.schema.main.14.description:Register in application with your credentials or use Google account.`,
      icon: faPlus
    }
  ];

  public LOCATIONS: IImageSliderItemModel[] = [
    {
      image: '/assets/images/welcome/locations/4a.jpg',
      title: $localize`:@@feature.welcome.page.locations.knu:Sports complex of Kyiv National University`,
      raiting: '1',
      link: 'https://google.com'
    },
    {
      image: '/assets/images/welcome/locations/4a.jpg',
      title: $localize`:@@feature.welcome.page.locations.rejo:REJO VDNH`,
      raiting: '2',
      link: 'https://rejo.ua/'
    },
    {
      image: '/assets/images/welcome/locations/4a.jpg',
      title: $localize`:@@feature.welcome.page.locations.meridian:Meridian Football Center`,
      raiting: '3'
    },
    {
      image: '/assets/images/welcome/locations/4a.jpg',
      title: $localize`:@@feature.welcome.page.locations.unknown:Unknown`,
      raiting: '4'
    },
    {
      image: '/assets/images/welcome/locations/4a.jpg',
      title: $localize`:@@feature.welcome.page.locations.unknown:Unknown`,
      raiting: '5'
    }
  ];

  constructor(private headerService: HeaderService, private changeDetectorRef: ChangeDetectorRef) { }

  public heroTitleTop$!: Observable<string>;

  ngAfterViewInit() {
    this.heroTitleTop$ = this.headerService.height$?.pipe(map(height => getCssLikeValue(height)));
    this.changeDetectorRef.detectChanges();
  }
}
