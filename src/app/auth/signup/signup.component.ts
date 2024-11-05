import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { FormService } from '../form.service';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  private formService = inject(FormService);
  private destroyRef = inject(DestroyRef);
  initialInputsValues = this.formService.loadFromData();

  form = new FormGroup({
    email: new FormControl(this.initialInputsValues.email, {
      validators: [Validators.email, Validators.required],
    }),

    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),

    firstName: new FormControl(this.initialInputsValues.firstName, {
      validators: [Validators.required],
    }),
    lastName: new FormControl(this.initialInputsValues.lastName, {
      validators: [Validators.required],
    }),

    address: new FormGroup({
      street: new FormControl(this.initialInputsValues.address.street, {
        validators: [Validators.required],
      }),
      number: new FormControl(this.initialInputsValues.address.number, {
        validators: [Validators.required],
      }),
      postalCode: new FormControl(this.initialInputsValues.address.postalCode, {
        validators: [Validators.required],
      }),
      city: new FormControl(this.initialInputsValues.address.city, {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  ngOnInit() {
    const subscribtion = this.formService.saveFormData(this.form);
    this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
  }

  controlIsInvalid(control: FormControl) {
    return control.dirty && control.touched && control.invalid;
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      this.form.reset();
      return;
    }
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
