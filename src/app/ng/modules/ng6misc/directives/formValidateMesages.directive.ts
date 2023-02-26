/** N O T I C E
 * This directive works best with Bootstrap 4 CSS framework because of 'form-control is-invalid' and 'invalid-feedback'.
 * Events: blur, input, change
 */
import { Directive, Input, OnInit, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormValidateMessages]'
})
export class FormValidateMessagesDirective implements OnInit {

  @Input() appFormValidateMessages: { id: string, FG: FormGroup; onevents: [string]; };
  @HostBinding('class') className: string;
  private FG: FormGroup;
  private onevents: [string]; // 'blur', 'input' -> INPUT tag , 'change' -> SELECT tag
  private id: string; // <input id="first_name"> => id = 'first_name'
  private field: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.className = 'form-control'; // initial CSS class for bootstrap 4 <input class="form-control">
  }


  ngOnInit() {
    this.FG = this.appFormValidateMessages.FG;
    this.onevents = this.appFormValidateMessages.onevents;

    /**
     * this.appFormValidateMessages.id    comes from    [appFormValidateMessages]="{id: 'first_name', FG: robotFG, onevents: ['blur', 'input']}"
     * this.el.nativeElement.id           comes from    <input id="first_name">
     * this.el.nativeElement.name         comes from    <input name="first_name">
     */
    this.field = this.appFormValidateMessages.id || this.el.nativeElement.id || this.el.nativeElement.name; // 'first_name' -> field name on which directive is applied
  }


  /** directive host listeners */
  @HostListener('blur') onblur() {
    if (this.onevents.indexOf('blur') !== -1) {
      // console.log('onblur', this.field, this.FG);
      this.hideError();
      const errMsg = this.getErrMessage(this.field) || '';
      !!errMsg ? this.showError(errMsg) : this.hideError();
    }
  }

  @HostListener('input') oninput() {
    if (this.onevents.indexOf('input') !== -1) {
      // console.log('input', this.field, this.FG);
      this.hideError();
      const errMsg = this.getErrMessage(this.field) || '';
      !!errMsg ? this.showError(errMsg) : this.hideError();
    }
  }

  @HostListener('change') onchange() {
    if (this.onevents.indexOf('change') !== -1) {
      // console.log('onchange', this.field, this.FG);
      this.hideError();
      const errMsg = this.getErrMessage(this.field) || '';
      !!errMsg ? this.showError(errMsg) : this.hideError();
    }
  }


  // define error message
  getErrMessage(field) {
    const ctrl = this.FG.controls[field];
    let errorMsg;

    if (!!ctrl.errors) {
      if (ctrl.errors.required) {
        errorMsg = `${field} is required`;
      } else if (ctrl.errors.maxlength) {
        errorMsg = `maxlength of ${ctrl.errors.maxlength.requiredLength} is reached`;
      } else if (ctrl.errors.minlength) {
        errorMsg = `minlength of ${ctrl.errors.minlength.requiredLength} is not reached yet`;
      } else if (ctrl.errors.min) {
        errorMsg = `min is ${ctrl.errors.min.min}`;
      } else if (ctrl.errors.max) {
        errorMsg = `max is ${ctrl.errors.max.max}`;
      } else if (ctrl.errors.email) {
        errorMsg = `email ${ctrl.value} is not valid`;
      } else {
        errorMsg = 'undefined field error';
      }
    }

    return errorMsg;
  }


  // show error in HTML
  showError(errorMsg) {
    const parent = this.el.nativeElement.parentNode;
    const span = __ngRendererCreateElementHelper(this.renderer, parent, 'span');
    this.renderer.addClass(span, 'invalid-feedback');
    __ngRendererCreateTextHelper(this.renderer, span, errorMsg);

    this.className = 'form-control is-invalid';
  }


  // hide error from HTML
  hideError() {
    const parent = this.el.nativeElement.parentNode;
    const span = parent.querySelector('.invalid-feedback');
    if (span) {
      parent.removeChild(span);
    }

    this.className = 'form-control';
  }


}

type AnyDuringRendererMigration = any;

function __ngRendererSplitNamespaceHelper(name: AnyDuringRendererMigration) {
    if (name[0] === ":") {
        const match = name.match(/^:([^:]+):(.+)$/);
        return [match[1], match[2]];
    }
    return ["", name];
}

function __ngRendererCreateElementHelper(renderer: AnyDuringRendererMigration, parent: AnyDuringRendererMigration, namespaceAndName: AnyDuringRendererMigration) {
    const [namespace, name] = __ngRendererSplitNamespaceHelper(namespaceAndName);
    const node = renderer.createElement(name, namespace);
    if (parent) {
        renderer.appendChild(parent, node);
    }
    return node;
}

function __ngRendererCreateTextHelper(renderer: AnyDuringRendererMigration, parent: AnyDuringRendererMigration, value: AnyDuringRendererMigration) {
    const node = renderer.createText(value);
    if (parent) {
        renderer.appendChild(parent, node);
    }
    return node;
}
