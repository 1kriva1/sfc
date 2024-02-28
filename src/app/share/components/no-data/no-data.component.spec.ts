import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataComponent } from './no-data.component';

describe('Share.Component: NoData', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoDataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Should create component', () => {
    expect(component).toBeTruthy();
  });

  fit("Should have main elements", () => {
    expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
  });

  fit('Should have default text', () => {
    expect(fixture.nativeElement.querySelector('span').innerText)
      .toEqual('No data');
  });

  fit('Should have defined text', () => {
    component.label = 'Test No data';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').innerText)
      .toEqual(component.label);
  });
});
