import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faHeart, faLink } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, CommonConstants, getCssLikeValue } from 'ngx-sfc-common';
import { ImageSliderItemType } from './image-slider-item-type.enum';
import { IImageSliderItemModel } from './image-slider-item.model';

@Component({
  selector: 'sfc-image-slider-item',
  templateUrl: './image-slider-item.component.html',
  styleUrls: ['./image-slider-item.component.scss']
})
export class ImageSliderItemComponent {

  faLink = faLink;
  faHeart = faHeart;

  ButtonType = ButtonType;

  @Input()
  item: IImageSliderItemModel = { image: CommonConstants.EMPTY_STRING, title: CommonConstants.EMPTY_STRING };

  @Input()
  @HostBinding('class')
  type: ImageSliderItemType = ImageSliderItemType.None;

  @ViewChild('image')
  imageEl!: ElementRef;

  private get imageHeight(): number {
    return this.imageEl?.nativeElement.offsetHeight || 0;
  }

  @HostBinding('style.height')
  private get height(): string {
    return getCssLikeValue(this.imageHeight);
  };

  public get linkSize(): number {
    return this.imageHeight * 0.03 / 16;
  }
}