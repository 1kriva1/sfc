import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faDownload, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, CommonConstants, getCssLikeValue } from 'ngx-sfc-common';
import { ImageSliderItemType } from './image-slider-item-type.enum';
import { IImageSliderItemModel } from './image-slider-item.model';

@Component({
  selector: 'sfc-image-slider-item',
  templateUrl: './image-slider-item.component.html',
  styleUrls: ['./image-slider-item.component.scss']
})
export class ImageSliderItemComponent {

  faDownload = faDownload;
  faHeart = faHeart;

  ButtonType = ButtonType;

  @Input()
  item: IImageSliderItemModel = { image: CommonConstants.EMPTY_STRING, title: CommonConstants.EMPTY_STRING };

  @Input()
  @HostBinding('class')
  type: ImageSliderItemType = ImageSliderItemType.None;

  @Input()
  raiting: boolean = true;

  @Input()
  link: boolean = false;

  @ViewChild('image')
  imageEl!: ElementRef;

  @HostBinding('style.height')
  get height(): string {
    return getCssLikeValue(this.imageEl?.nativeElement.offsetHeight || 0);
  };
}
