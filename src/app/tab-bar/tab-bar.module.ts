import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabBarComponent } from './bar/tab-bar.component';
import { TabComponent } from './tab/tab.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TabBarComponent, TabComponent],
  imports: [CommonModule, RouterModule],
  exports: [TabBarComponent],
})
export class TabBarModule {}
