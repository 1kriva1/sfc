import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, ButtonType, CommonConstants, ComponentSize, ComponentSizeDirective } from 'ngx-sfc-common';
import { ImageSliderComponent } from './image-slider.component';
import { ImageSliderItemType } from './parts/image-slider-item/image-slider-item-type.enum';
import { ImageSliderItemComponent } from './parts/image-slider-item/image-slider-item.component';

describe('Features.Welcome.Component: ImageSlider', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ComponentSizeDirective, ButtonComponent, ImageSliderItemComponent, ImageSliderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.items')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.actions')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
    });

    fit("Should have not any slides", () => {
      expect(component.items.length).toEqual(0);
    });
  });

  describe('Items', () => {
    fit("Should not exist any item", () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-image-slider-item').length).toEqual(0);
    });

    fit("Should exist defined items", () => {
      component.items = [
        { image: 'test1.png', title: 'test1' },
        { image: 'test2.png', title: 'test2' },
        { image: 'test3.png', title: 'test3' }
      ];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-image-slider-item').length).toEqual(3);
    });

    fit('Should have appropriate attributes', () => {
      component.items = [
        { image: 'test1.png', title: 'test1' },
        { image: 'test2.png', title: 'test2' },
        { image: 'test3.png', title: 'test3' },
        { image: 'test4.png', title: 'test4' },
        { image: 'test5.png', title: 'test5' },
        { image: 'test6.png', title: 'test6' }
      ];
      fixture.detectChanges();

      const itemsEls: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-image-slider-item'));

      itemsEls.forEach((itemEl, index) => expect(itemEl.componentInstance.item).toEqual(component.items[index]));

      expect(itemsEls[0].componentInstance.type).toEqual(ImageSliderItemType.Active);
      expect(itemsEls[1].componentInstance.type).toEqual(ImageSliderItemType.NextActive);
      expect(itemsEls[2].componentInstance.type).toEqual(ImageSliderItemType.Previous);
      expect(itemsEls[3].componentInstance.type).toEqual(ImageSliderItemType.None);
      expect(itemsEls[4].componentInstance.type).toEqual(ImageSliderItemType.Next);
      expect(itemsEls[5].componentInstance.type).toEqual(ImageSliderItemType.PreviousActive);
    });
  });

  describe('Actions', () => {
    fit('Should previous button have appropriate attributes', () => {
      const previousBtn: DebugElement = fixture.debugElement.query(By.css('sfc-button.previous'));

      expect(previousBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
      expect(previousBtn.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
      expect(previousBtn.componentInstance.text).toBeUndefined();
      expect(previousBtn.componentInstance.iconBefore.iconName).toEqual('arrow-left');
      expect(previousBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit('Should next button have appropriate attributes', () => {
      const nextBtn: DebugElement = fixture.debugElement.query(By.css('sfc-button.next'));

      expect(nextBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
      expect(nextBtn.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
      expect(nextBtn.componentInstance.text).toBeUndefined();
      expect(nextBtn.componentInstance.iconBefore.iconName).toEqual('arrow-right');
      expect(nextBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit('Should move items to next', () => {
      component.items = [
        { image: 'test1.png', title: 'test1' },
        { image: 'test2.png', title: 'test2' },
        { image: 'test3.png', title: 'test3' },
        { image: 'test4.png', title: 'test4' },
        { image: 'test5.png', title: 'test5' },
        { image: 'test6.png', title: 'test6' }
      ];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('sfc-button.next')).nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const itemsEls: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-image-slider-item'));

      expect(itemsEls[0].componentInstance.type).toEqual(ImageSliderItemType.PreviousActive);
      expect(itemsEls[1].componentInstance.type).toEqual(ImageSliderItemType.Active);
      expect(itemsEls[2].componentInstance.type).toEqual(ImageSliderItemType.NextActive);
      expect(itemsEls[3].componentInstance.type).toEqual(ImageSliderItemType.Previous);
      expect(itemsEls[4].componentInstance.type).toEqual(ImageSliderItemType.None);
      expect(itemsEls[5].componentInstance.type).toEqual(ImageSliderItemType.Next);
    });

    fit('Should move items to previous', () => {
      component.items = [
        { image: 'test1.png', title: 'test1' },
        { image: 'test2.png', title: 'test2' },
        { image: 'test3.png', title: 'test3' },
        { image: 'test4.png', title: 'test4' },
        { image: 'test5.png', title: 'test5' },
        { image: 'test6.png', title: 'test6' }
      ];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('sfc-button.previous')).nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const itemsEls: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-image-slider-item'));

      expect(itemsEls[0].componentInstance.type).toEqual(ImageSliderItemType.NextActive);
      expect(itemsEls[1].componentInstance.type).toEqual(ImageSliderItemType.Previous);
      expect(itemsEls[2].componentInstance.type).toEqual(ImageSliderItemType.None);
      expect(itemsEls[3].componentInstance.type).toEqual(ImageSliderItemType.Next);
      expect(itemsEls[4].componentInstance.type).toEqual(ImageSliderItemType.PreviousActive);
      expect(itemsEls[5].componentInstance.type).toEqual(ImageSliderItemType.Active);
    });
  });
});
