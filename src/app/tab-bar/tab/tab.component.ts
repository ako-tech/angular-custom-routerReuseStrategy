import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Tab } from '../model';

@Component({
  selector: 'ako-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() tab!: Tab;
  @Output() closed = new EventEmitter<void>();

  constructor() {}

  onClosed(event: MouseEvent): void {
    event.stopPropagation();
    this.closed.emit();
  }
}
