import { Pipe, PipeTransform } from '@angular/core';

/**
 * {{true | yesno} } => yes
 * {{true | yesno:true} } => YES
 * {{false | yesno} } => no
 * {{false | yesno:true} } => NO
 */
@Pipe({name: 'yesno'})
export class YesnoPipe implements PipeTransform {
  rez: string;
  transform(value: boolean, uppercase_tf: boolean): string {
    this.rez = (value) ? 'yes' : 'no';
    if (uppercase_tf) {
      this.rez = this.rez.toUpperCase();
    }
    return this.rez;
  }
}
