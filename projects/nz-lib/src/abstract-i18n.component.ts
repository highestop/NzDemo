import { OnDestroy, OnInit } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class AbstractI18n implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject<void>();
  protected constructor(protected readonly i18n: NzI18nService) {}
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.setLocale();
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  abstract setLocale(): void;
}
