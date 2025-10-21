import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DemoService } from '../demo.service';
import { NgxBrazilMASKS, NgxBrazilMASKSIE } from 'public_api';

@Component({
    selector: 'app-with-reactive-forms', templateUrl: './demo-with-reactive-forms.component.html', styleUrls: ['./demo-with-reactive-forms.component.scss'],
    standalone: false
})
export class DemoWithReactiveFormsComponent implements OnInit {
  public MASKS: any = NgxBrazilMASKS;
  public MASKSIE: any = NgxBrazilMASKSIE;
  
  public state = 'SP';

  public formFields: any;
  public formData: any = {};
  public formDataValidate: any = {};
  public form: any;

  generated: any = {};
  
  constructor(public fb: FormBuilder, public demoService: DemoService) { }

  ngOnInit(): void {
    this.formFields = this.demoService.buildForm(this.state);
    this.form = this.fb.group(this.formFields);
  }

  changeState(e: any) {
    this.state = this.demoService.changeState(e);
  }

  generate(key: string) {
    this.generated[key] = this.demoService.generate(key);
  }

  submit(form: FormGroup) {
      if (form.valid) {
          this.formData = form.value;
          this.formDataValidate = {};
          return;
      }
      
      this.demoService.markAllAsTouchedAndDirty(form);
      this.formDataValidate = this.demoService.collectValidationErrors(form);

      this.demoService.focusFirstInvalidControl(form, '.with-reactive-forms input, .with-reactive-forms select, .with-reactive-forms textarea');
  }
}
