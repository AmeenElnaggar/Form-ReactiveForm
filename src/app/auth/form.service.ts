import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
}
