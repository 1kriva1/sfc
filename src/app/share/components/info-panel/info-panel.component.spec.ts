import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants } from 'ngx-sfc-common';
import { InfoPanelComponent } from './info-panel.component';

describe('Share.Component: InfoPanel', () => {
    let component: InfoPanelComponent;
    let fixture: ComponentFixture<InfoPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [InfoPanelComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(InfoPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create component', () => {
        expect(component).toBeTruthy();
    });

    fit('Should have default model', () => {
        expect(component.model).toEqual({
            background: '#fff',
            description: CommonConstants.EMPTY_STRING,
            icon: faInfo,
            iconBackground: '#e6e6e6',
            title: CommonConstants.EMPTY_STRING
        });
    });

    fit("Should have background style", () => {
        expect(fixture.nativeElement.querySelector('div.container').style.background)
            .toEqual('rgb(255, 255, 255)');
    });

    fit("Should icon has background style", () => {
        expect(fixture.nativeElement.querySelector('fa-icon').style.background)
            .toEqual('rgb(230, 230, 230)');
    });

    fit('Should have defined icon value', () => {
        component.model.icon = faStar;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-star');
    });

    fit('Should have defined description', () => {
        expect(fixture.nativeElement.querySelector('.info > span').innerText)
            .toEqual(component.model.description);
    });

    fit('Should have defined title', () => {
        expect(fixture.nativeElement.querySelector('.info > h3').innerText)
            .toEqual(component.model.title);
    });
});