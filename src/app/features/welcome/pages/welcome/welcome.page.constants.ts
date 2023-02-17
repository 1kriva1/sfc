import { faCirclePlay, faFutbol, faIdCard, faPeopleGroup, faPersonWalking, faPlus, faSearch, faTruckField, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ITimelineItemModel, TimelineItemPosition } from "ngx-sfc-components";
import { IImageSliderItemModel } from "../../components";

export class WelcomePageConstants {
    static PROCESS_SET_UP: ITimelineItemModel[] = [
        { title: 'Set up journey', period: true },
        {
            title: 'Sign Up',
            position: TimelineItemPosition.Right,
            description: 'Register in application with your credentials or use Google account.',
            icon: faUserPlus
        },
        {
            title: 'Create profile',
            position: TimelineItemPosition.Right,
            description: 'In a few second create profile data with brief information about yourself and football skills.',
            icon: faIdCard
        }
    ];

    static PROCESS_MAIN: ITimelineItemModel[] = [
        { title: 'Next possibilities', period: true },
        {
            title: 'Games',
            position: TimelineItemPosition.Left,
            icon: faFutbol
        },
        {
            title: 'Find',
            position: TimelineItemPosition.Right,
            description: 'Find any game that fit your requirements.',
            icon: faSearch
        },
        {
            title: 'Create',
            position: TimelineItemPosition.Right,
            description: 'Create your own game and gather others.',
            icon: faPlus
        },
        {
            title: 'Players',
            position: TimelineItemPosition.Left,
            icon: faPersonWalking
        },
        {
            title: 'Find',
            position: TimelineItemPosition.Right,
            description: 'Find players for your game or team.',
            icon: faSearch
        },
        {
            title: 'Trainings',
            position: TimelineItemPosition.Right,
            description: 'Fing friends for regular trainings and sparings.',
            icon: faUserGroup
        },
        {
            title: 'Teams',
            position: TimelineItemPosition.Left,
            icon: faPeopleGroup
        },
        {
            title: 'Find',
            position: TimelineItemPosition.Right,
            description: 'Find team for regular trainings and sparings.',
            icon: faSearch
        },
        {
            title: 'Create',
            position: TimelineItemPosition.Right,
            description: 'Create your own team.',
            icon: faPlus
        },
        {
            title: 'Play',
            position: TimelineItemPosition.Right,
            description: 'Find and play sparing partners for your team.',
            icon: faCirclePlay
        },
        {
            title: 'Fields',
            position: TimelineItemPosition.Left,
            icon: faTruckField
        },
        {
            title: 'Find',
            position: TimelineItemPosition.Right,
            description: 'Register in application with your credentials or use Google account.',
            icon: faSearch
        },
        {
            title: 'Add new',
            position: TimelineItemPosition.Right,
            description: 'Register in application with your credentials or use Google account.',
            icon: faPlus
        }
    ];

    static LOCATIONS: IImageSliderItemModel[] = [
        { image: '/assets/images/welcome/locations/default.jpg', title: 'Through the Mountains', raiting: '1' },
        { image: '/assets/images/welcome/locations/default.jpg', title: 'Through the Mountains', raiting: '2' },
        { image: '/assets/images/welcome/locations/default.jpg', title: 'Through the Mountains', raiting: '3' },
        { image: '/assets/images/welcome/locations/default.jpg', title: 'Through the Mountains', raiting: '4' },
        { image: '/assets/images/welcome/locations/default.jpg', title: 'Through the Mountains', raiting: '5' }
    ];
}