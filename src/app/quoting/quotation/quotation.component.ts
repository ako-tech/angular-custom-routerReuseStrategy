import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith, finalize, map, Subject, takeUntil, tap } from 'rxjs';

import { TabManagerService } from '../../tab-bar';
import { QuotationsService } from '../quotations.service';
import { Quotation, QuotationItem } from '../quotation.interface';

@Component({
  selector: 'ako-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationComponent implements OnInit {
  quotationCopy!: Quotation;
  form!: FormGroup;

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  private destroyNotifier$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuotationsService,
    private fb: FormBuilder,
    private router: Router,
    private tabManager: TabManagerService
  ) {}

  ngOnInit(): void {
    this.quotationCopy = { ...this.route.snapshot.data?.['quotation'] };

    this.initForm(this.quotationCopy);
    this.addOrUpdateSelfTab();

    console.log(`QuotationComponent(${this.quotationCopy.id}) Created`);
  }

  private initForm(initialValue: Quotation): void {
    const { client, items } = initialValue;

    this.form = this.fb.group({
      client: this.fb.group(client),
      items: this.fb.array(items.map((item) => this.createItemRow(item))),
    });

    this.form
      .get('items')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (items: QuotationItem[]) =>
          (this.quotationCopy.total = items.reduce(
            (acc, item) => (acc += Number(item.price)),
            0
          ))
      );
  }

  private createItemRow(item?: QuotationItem) {
    return this.fb.group({
      description: item?.description ?? '',
      price: item?.price ?? 0,
    });
  }

  private addOrUpdateSelfTab(): void {
    this.tabManager.addOrUpdate({
      url: this.router.url,
      title: String(this.quotationCopy.id),
      dirty$: this.form.valueChanges.pipe(
        takeUntil(this.destroyNotifier$),
        map((_) => this.form.dirty),
        endWith(false)
      ),
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    console.log(`QuotationComponent(${this.quotationCopy.id}) Destroyed`);
  }

  onSave(form: FormGroup): void {
    const quotationToSave: Quotation = {
      ...this.quotationCopy,
      ...form.value,
    };

    this.quoteService
      .save(quotationToSave)
      .pipe(
        tap((savedQuotation) => (this.quotationCopy = { ...savedQuotation })),
        finalize(() => form.reset(form.value))
      )
      .subscribe();
  }

  addRow(): void {
    const items = this.items;
    items.markAsDirty();
    items.push(this.createItemRow());
  }

  deleteRow(index: number): void {
    const items = this.items;
    items.markAsDirty();
    items.removeAt(index);
  }
}
