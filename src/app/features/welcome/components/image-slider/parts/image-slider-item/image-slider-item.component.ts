import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faHeart, faLink } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, CommonConstants } from 'ngx-sfc-common';
import { ImageSliderItemType } from './image-slider-item-type.enum';
import { IImageSliderItemModel } from './image-slider-item.model';

@Component({
  selector: 'sfc-image-slider-item',
  templateUrl: './image-slider-item.component.html',
  styleUrls: ['./image-slider-item.component.scss']
})
export class ImageSliderItemComponent {

  private readonly SIZE_FACTOR = 0.001875;

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

  @HostBinding('style.height.px')
  private get _height(): number {
    return this.imageEl?.nativeElement.offsetHeight || 0;
  };

  public get sizeFactor(): number {
    return this._height * this.SIZE_FACTOR;
  }
}
