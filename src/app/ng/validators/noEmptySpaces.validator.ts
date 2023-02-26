import { FormControl } from '@angular/forms';

class NoEmptySpaces {

  /**
   * Correct input string.
   * @param fc : FormControl
   */
  static correct(fc: FormControl) {
    const input: string = fc.value;
    const re = new RegExp(/\s/g);
    // console.log(input, fc);

    /* when input contain empty space \s replace it with _ */
    if (re.test(input)) {
      const input2 = input.replace(re, '_');
      fc.setValue(input2); // set formcontrol value
    }

    return null; // no error message
  }



}


export { NoEmptySpaces };
