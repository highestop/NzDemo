import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd';
import { NzDemoComponent } from './nz-demo.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [NzDatePickerModule, FormsModule, CommonModule],
  declarations: [NzDemoComponent],
  exports: [NzDemoComponent],
})
export class NzModule {}
