import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  first,
  ignoreElements,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { Quotation } from './quotation.interface';
import { dummyData } from './dummy.data';

@Injectable({ providedIn: 'root' })
export class QuotationsService {
  private _quotations$ = new BehaviorSubject<Quotation[]>(dummyData);
  quotations$ = this._quotations$.asObservable();

  constructor() {}

  getById(id: number): Observable<Quotation | null> {
    return this.quotations$.pipe(
      map(
        (quotations) =>
          quotations.find((quotation) => quotation.id === id) ?? null
      )
    );
  }

  save(quotation: Quotation): Observable<Quotation> {
    return of(quotation).pipe(
      map((quotation) => ({
        ...quotation,
        lastModified: new Date().toISOString(),
      })),
      withLatestFrom(this.quotations$),
      tap(([quotation, state]) => {
        const newState = this.saveReducer(quotation, state);
        this._quotations$.next(newState);
      }),
      map(([quotation, _]) => quotation)
    );
  }

  private saveReducer(quotation: Quotation, state: Quotation[]): Quotation[] {
    const quotationIndex = state.findIndex((item) => item.id === quotation.id);

    if (quotationIndex === -1) {
      return [...state, quotation];
    }

    const newState = [...state];
    newState.splice(quotationIndex, 1, quotation);
    return newState;
  }
}
