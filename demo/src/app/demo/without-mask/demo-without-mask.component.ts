import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NgxBrazil } from 'ngx-brazil';

import { DemoService } from '../demo.service';
import { ErrorContainerComponent } from '../errors-area/error-container.component';

@Component({
  selector: 'app-without-mask',
  templateUrl: './demo-without-mask.component.html',
  styleUrls: ['./demo-without-mask.component.scss'],
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      NgxBrazil,
      ErrorContainerComponent
  ]

})
export class DemoWithoutMaskComponent implements OnInit {
    public state = 'SP';

    public formFields: any;
    public formData: any = {};
    public formDataValidate: any = {};
    public formNoMask: any;

    generated: any = {};
    
    constructor(public fb: FormBuilder, public demoService: DemoService) { }

    ngOnInit(): void {
      this.formFields = this.demoService.buildForm(this.state);
      this.formNoMask = this.fb.group(this.formFields);
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

        this.demoService.focusFirstInvalidControl(form, '.without-mask input, .without-mask select, .without-mask textarea');
    }
}
