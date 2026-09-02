import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { DemoService } from '../demo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-without-mask',
  templateUrl: './demo-without-mask.component.html',
  styleUrls: ['./demo-without-mask.component.scss'],
  standalone: false
})
export class DemoWithoutMaskComponent implements OnInit {
  protected readonly demoService = inject(DemoService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly states = this.demoService.states;

  state = 'SP';
  formFields: any;
  formData: any = {};
  formDataValidate: any = {};
  formNoMask?: FormGroup;
  controls: Record<string, AbstractControl> = {};
  generated: any = {};

  ngOnInit(): void {
    this.formFields = this.demoService.buildForm(this.state);
    this.formNoMask = this.fb.group(this.formFields);
    this.controls = this.formNoMask.controls;
    this.watchForm(this.formNoMask);
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
      '.without-mask input, .without-mask select, .without-mask textarea'
    );
  }

  private watchForm(form: FormGroup): void {
    form.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.cdr.markForCheck());
    form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.cdr.markForCheck());
  }
}
