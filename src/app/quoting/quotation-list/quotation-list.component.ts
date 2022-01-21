import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';
import { Quotation } from '../quotation.interface';
import { QuotationsService } from '../quotations.service';

@Component({
  selector: 'ako-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationListComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  quotations$ = this.quotationsService.quotations$.pipe(
    map((quotations) =>
      quotations.sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      )
    )
  );

  filteredQuotations$: Observable<Quotation[]> = combineLatest([
    this.quotations$,
    this.searchControl.valueChanges.pipe<any, string>(
      debounceTime(300),
      startWith('')
    ),
  ]).pipe(
    map(([quotations, filter]) => {
      if (!filter) {
        return quotations;
      }

      return quotations.filter(({ id, client, total }) => {
        return [id, client.name, total]
          .join('¶')
          .toLowerCase()
          .includes(filter.toLowerCase());
      });
    })
  );

  constructor(private quotationsService: QuotationsService) {}

  ngOnInit(): void {
    console.log('QuotationListComponent Created');
  }

  ngOnDestroy(): void {
    console.log('QuotationListComponent Destroyed');
  }
}
