import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, first, mergeMap, Observable, of } from 'rxjs';

import { Quotation } from '../quotation.interface';
import { QuotationsService } from '../quotations.service';

@Injectable({ providedIn: 'root' })
export class QuotationResolver implements Resolve<Quotation> {
  constructor(
    private quotationsService: QuotationsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Quotation> | Observable<never> {
    const id = route.paramMap.get('id');

    if (id === null) {
      return EMPTY;
    }

    return this.quotationsService.getById(Number(id)).pipe(
      first(),
      mergeMap((quotation) => {
        if (quotation === null) {
          this.router.navigateByUrl('/quotations');
          return EMPTY;
        }

        return of(quotation);
      })
    );
  }
}
