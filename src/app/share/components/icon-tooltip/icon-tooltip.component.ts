import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Position } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-icon-tooltip',
  templateUrl: './icon-tooltip.component.html',
  styleUrls: ['./icon-tooltip.component.scss']
})
export class IconTooltipComponent {

  @Input()
  position: Position = Position.Bottom;

  @Input()
  tooltip!: string;

  @Input()
  icon!: IconDefinition;
}
