import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tab } from '../model';
import { TabManagerService } from '../tab-manager.service';

@Component({
  selector: 'ako-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent implements OnInit {
  tabs$ = this.tabManager.openedTabs$;

  constructor(private tabManager: TabManagerService, private router: Router) {}

  ngOnInit(): void {}

  onHomeButtonClicked(): void {
    this.navigateHome();
  }

  onTabClosed(tab: Tab): void {
    this.tabManager.removeTab(tab);
    this.navigateHome();
  }

  private navigateHome(): void {
    this.router.navigate(['/']);
  }
}
