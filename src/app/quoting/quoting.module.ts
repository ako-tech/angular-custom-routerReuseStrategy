import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuotingRoutingModule } from './quoting-routing.module';

import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationComponent } from './quotation/quotation.component';

@NgModule({
  declarations: [QuotationListComponent, QuotationComponent],
  imports: [CommonModule, QuotingRoutingModule, ReactiveFormsModule],
})
export class QuotingModule {
  constructor() {}
}
