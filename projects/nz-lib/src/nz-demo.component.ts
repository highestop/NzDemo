import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractI18n } from './abstract-i18n.component';

@Component({
  selector: 'nz-demo',
  template: `<nz-date-picker
    *ngIf="enableDate"
    [(ngModel)]="date"
    [nzFormat]="nzFormat"
    [nzShowTime]="nzShowTime"
    [nzPlaceHolder]="nzPlaceHolder"
    [nzDisabled]="disabled"
    [nzMode]="panelMode"
  ></nz-date-picker>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzDemoComponent),
      multi: true,
    },
  ],
})
export class NzDemoComponent extends AbstractI18n {
  @Input() readonly enableDate: boolean = true;
  @Input() readonly dateFormat: string = 'yyyy.MM.dd';
  @Input() readonly timeFormat?: string;
  @Input() readonly placeholder?: string;
  @Input() readonly disabled: boolean = false;
  @Input() readonly panelMode: string = 'date';
  date?: Date;
  nzPlaceHolder = '';
  onChange: (dateTimestamp?: number) => void = () => {};
  @HostListener('touch')
  onTouched: () => void = () => {};
  get nzShowTime() {
    if (this.timeFormat != null) {
      return {
        nzFormat: this.timeFormat,
      };
    }
    return false;
  }
  get nzFormat(): string | undefined {
    if (this.dateFormat != null && this.timeFormat != null) {
      return `${this.dateFormat} ${this.timeFormat}`;
    } else {
      return this.dateFormat;
    }
  }
  constructor(protected readonly i18n: NzI18nService) {
    super(i18n);
  }
  setLocale() {
    this.nzPlaceHolder = this.i18n.getLocaleData('DatePicker.lang.placeholder');
  }
  writeValue(dateTimestamp?: number) {
    if (dateTimestamp != null) {
      this.date = new Date(dateTimestamp);
    } else {
      this.date = undefined;
    }
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  registerOnChange(fn: (dateTimestamp?: number) => void): void {
    this.onChange = fn;
  }
  onModelChange(date?: Date) {
    this.onChange(date != null ? date.getTime() : date);
  }
}
