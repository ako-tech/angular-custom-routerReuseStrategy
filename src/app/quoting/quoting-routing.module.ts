import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationResolver } from './quotation/quotation.resolver';

const routes: Routes = [
  {
    path: '',
    component: QuotationListComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: QuotationComponent,
    resolve: {
      quotation: QuotationResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotingRoutingModule {}
