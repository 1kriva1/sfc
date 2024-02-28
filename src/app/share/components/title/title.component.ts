import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'sfc-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input()
  label!: string;

  @Input()
  description!: string;

  @Input()
  tooltip!: string;

  @Input()
  icon: IconDefinition | null = null;

  @Input()
  delimeter: boolean = true;
}
