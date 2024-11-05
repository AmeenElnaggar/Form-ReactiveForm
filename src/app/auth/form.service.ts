import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
  saveFormData(form: FormGroup) {
    return form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (formData) =>
        window.localStorage.setItem(
          'save-login-form',
          JSON.stringify(formData)
        ),
    });
  }

  loadFromData() {
    const savedForm = window.localStorage.getItem('save-login-form');
    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      return loadedForm;
    }
    return '';
  }

  equalValues(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
      const val1 = control.get(controlName1)?.value;
      const val2 = control.get(controlName2)?.value;

      if (val1 === val2) {
        return null;
      }

      return { valuesNotEqual: true };
    };
  }

  inputsInitialValues(form: FormGroup, addressControls: FormGroup) {
    form.controls['email'].setValue(this.loadFromData().email);
    form.controls['firstName'].setValue(this.loadFromData().firstName);
    form.controls['lastName'].setValue(this.loadFromData().lastName);
    addressControls.controls['street'].setValue(
      this.loadFromData().address.street
    );
    addressControls.controls['city'].setValue(this.loadFromData().address.city);
    addressControls.controls['postalCode'].setValue(
      this.loadFromData().address.postalCode
    );
    addressControls.controls['number'].setValue(
      this.loadFromData().address.number
    );
  }
}
