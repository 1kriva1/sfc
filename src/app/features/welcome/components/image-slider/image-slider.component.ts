import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';
import { IImageSliderModel } from './image-slider.model';
import { ImageSliderItemType } from './parts/image-slider-item/image-slider-item-type.enum';
import { IImageSliderItemModel } from './parts/image-slider-item/image-slider-item.model';

@Component({
  selector: 'sfc-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  ButtonType = ButtonType;
  ComponentSize = ComponentSize;

  @Input()
  items: IImageSliderItemModel[] = [];

  private current: number = -1;

  private get total(): number { return this.items.length - 1; }

  private get model(): IImageSliderModel {
    const previousActive = this.getIndex(this.current, false),
      nextActive = this.getIndex(this.current, true);

    return {
      Active: this.current,
      PreviousActive: previousActive,
      NextActive: nextActive,
      Previous: this.getIndex(nextActive, true),
      Next: this.getIndex(previousActive, false)
    }
  }

  ngOnInit(): void {
    this.next();
  }

  public next(): void {
    this.current = this.getIndex(this.current, true);
  }

  public previous(): void {
    this.current = this.getIndex(this.current, false);
  }

  public getItemType(index: number): ImageSliderItemType {
    switch (index) {
      case this.model.Active:
        return ImageSliderItemType.Active;
      case this.model.PreviousActive:
        return ImageSliderItemType.PreviousActive;
      case this.model.NextActive:
        return ImageSliderItemType.NextActive;
      case this.model.Next:
        return ImageSliderItemType.Next;
      case this.model.Previous:
        return ImageSliderItemType.Previous;
      default:
        return ImageSliderItemType.None;
    }
  }

  private getIndex(value: number, next: boolean): number {
    return next
      ? value < this.total ? value + 1 : 0
      : value > 0 ? value - 1 : this.total;
  }
}
