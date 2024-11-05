import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormService } from '../form.service';

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

  form = new FormGroup({
    email: new FormControl('', {
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
        validators: [
          this.formService.equalValues('password', 'confirmPassword'),
        ],
      }
    ),

    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),

    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
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
    this.formService.inputsInitialValues(
      this.form,
      this.form.controls['address']
    );
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
