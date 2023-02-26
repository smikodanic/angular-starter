/**
 * Manipulation with text and strings.
 */
import { Injectable } from '@angular/core';



@Injectable()
export class TextService {


  constructor() {
  }


  /**
   * Trim empty spaces from left and right and remove tab spaces inside text
   * @param str - string to be modified
   * @return string - modified string is returned
   */
  strongtrim(str: string): string {
    if (!!str && typeof str === 'string') {
      str = str.trim();
      str = str.replace(/\t\t+/g, ' ');
      str = str.replace(/\s\s+/g, ' ');
      str = str.replace(/\n\n+/g, '\n');
      str = str.replace(/\r\r+/g, '\r');
      str = str.replace(/\. /g, '.\r'); // new sentence in new line
    }
    return str;
  }



  // replace empty spaces \s with _
  replaceEmptySpaces(str: string): string {
    const re = new RegExp(/\s/g);
    if (re.test(str)) {
      str = str.replace(re, '_');
    }
    return str;
  }



}
