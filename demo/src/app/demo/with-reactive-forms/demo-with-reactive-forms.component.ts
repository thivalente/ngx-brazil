import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { merge } from 'rxjs';

import { NgxBrazil, NgxBrazilMASKS, NgxBrazilMASKSIE } from 'ngx-brazil';

import { DemoService } from '../demo.service';
import { ErrorContainerComponent } from '../errors-area/error-container.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-with-reactive-forms',
  templateUrl: './demo-with-reactive-forms.component.html',
  styleUrls: ['./demo-with-reactive-forms.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgxBrazil,
    ErrorContainerComponent
  ]
})
export class DemoWithReactiveFormsComponent implements OnInit {
  protected readonly demoService = inject(DemoService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly MASKS: any = NgxBrazilMASKS;
  readonly MASKSIE: any = NgxBrazilMASKSIE;
  readonly states = this.demoService.states;

  state = 'SP';
  formFields: any;
  formData: any = {};
  formDataValidate: any = {};
  form?: FormGroup;
  controls: Record<string, AbstractControl> = {};
  generated: any = {};

  ngOnInit(): void {
    this.formFields = this.demoService.buildForm(this.state);
    this.form = this.fb.group(this.formFields);
    this.controls = this.form.controls;
    this.watchForm(this.form);
  }

  changeState(event: Event): void {
    this.state = this.demoService.changeState(event);
  }

  generate(key: string): void {
    this.generated = { ...this.generated, [key]: this.demoService.generate(key) };
  }

  submit(form: FormGroup): void {
    if (form.valid) {
      this.formData = form.value;
      this.formDataValidate = {};
      return;
    }

    this.demoService.markAllAsTouchedAndDirty(form);
    this.formDataValidate = this.demoService.collectValidationErrors(form);
    this.demoService.focusFirstInvalidControl(
      form,
      '.with-reactive-forms input, .with-reactive-forms select, .with-reactive-forms textarea'
    );
  }

  private watchForm(form: FormGroup): void {
    merge(form.statusChanges, form.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }
}
