import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { Tab } from './model';

const defaultTab: Tab = {
  url: '',
  title: '',
  dirty$: of(false),
};

@Injectable({ providedIn: 'root' })
export class TabManagerService {
  private _openedTabs$ = new BehaviorSubject<Tab[]>([]);
  openedTabs$ = this._openedTabs$.asObservable();

  private get currentTabs(): Tab[] {
    return this._openedTabs$.value;
  }

  constructor() {}

  addOrUpdate(tab: Tab): void {
    const tabIndex: number | null = this.findTabIndexByUrl(tab.url);

    tabIndex === null ? this.addTab(tab) : this.updateTabAt(tabIndex, tab);
  }

  removeTab(tab: Tab): void {
    const tabIndex = this.findTabIndexByUrl(tab.url);

    if (tabIndex === null) {
      return;
    }

    const stateCopy = [...this.currentTabs];
    stateCopy.splice(tabIndex, 1);
    this._openedTabs$.next(stateCopy);
  }

  private addTab(tab: Tab): void {
    const tabFromDefault = { ...defaultTab, ...tab };
    this._openedTabs$.next([...this.currentTabs, tabFromDefault]);
  }

  private updateTabAt(tabIndex: number, newTab: Tab): void {
    const stateCopy = [...this.currentTabs];
    stateCopy.splice(tabIndex, 1, newTab);

    this._openedTabs$.next(stateCopy);
  }

  private findTabIndexByUrl(url: string): number | null {
    const tabIndex = this.currentTabs.findIndex((item) => item.url === url);

    return tabIndex !== -1 ? tabIndex : null;
  }
}
