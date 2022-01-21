import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { CustomRouterReuseStrategy } from './custom-router-reuse.strategy';

const routes: Routes = [
  {
    path: 'quotations',
    loadChildren: () =>
      import('./quoting/quoting.module').then((m) => m.QuotingModule),
  },
  {
    path: '',
    redirectTo: 'quotations',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouterReuseStrategy,
    },
  ],
})
export class AppRoutingModule {}
