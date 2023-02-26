import { NgModule } from '@angular/core';
import { FormValidateMessagesDirective } from './directives/formValidateMesages.directive';
import { YesnoPipe } from './pipes/yesno.pipe';


@NgModule({
  imports: [
  ],
  declarations: [
    FormValidateMessagesDirective,
    YesnoPipe,
  ],
  providers: [
  ],
  exports: [
    FormValidateMessagesDirective,
    YesnoPipe
  ]
})
export class Ng6MiscModule { }
