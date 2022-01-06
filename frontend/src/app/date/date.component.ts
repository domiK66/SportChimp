import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  date: FormControl = new FormControl();
  private propagateChange: any;
  minDate: Date;
  maxDate: Date;

  @Input()
  placeholder = '';
  @Input()
  hint: any;
  @Input()
  required = false;

  constructor(private fb: FormBuilder) {
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 31);
  }

  ngOnInit() {
    let validator = null;
    if (this.required) {
      validator = Validators.required;
    }
    this.date = this.fb.control(null, validator);
    this.date.valueChanges.subscribe((newValue) => {
      const newDate = newValue ? new Date(newValue.getTime() - (newValue.getTimezoneOffset() * 60000)).toISOString().slice(0, 10) : null;
      this.propagateChange(newDate);
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }

  setDisabledState(isDisabled: boolean): void {
    // do nothing
  }

  writeValue(obj: any): void {
    this.date.patchValue(obj, {emitEvent: false});
  }

  hasError(errorName: string) {
    return this.date.hasError(errorName);
  }
}
