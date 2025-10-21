import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxBrazilValidators } from 'public_api';
import { fakerBr } from '../../../../ngx-brazil/src/_utils/fakers/faker';

@Injectable({ providedIn: 'root' })
export class DemoService {
    public onGeneratedValue = new EventEmitter<string>();

    public states = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS',
        'SC', 'SE', 'SP', 'TO'
    ];

    buildForm(initialState: string): any {
        return {
            state: [initialState],
            cpf: ['', [Validators.required, NgxBrazilValidators.cpf]],
            cnpj: ['', [Validators.required, NgxBrazilValidators.cnpj]],
            rg: ['', [Validators.required, NgxBrazilValidators.rg]],
            inscricaoestadual: ['', [Validators.required, NgxBrazilValidators.inscricaoestadual(initialState)]],
            phoneNumber: ['', [Validators.required, NgxBrazilValidators.phoneNumber]],
            cep: ['', [Validators.required, NgxBrazilValidators.cep]],
            currency: ['', [Validators.required, NgxBrazilValidators.currency]],
            currencyNumber: [0, [Validators.required, NgxBrazilValidators.currency]],
            number: ['', [Validators.required, NgxBrazilValidators.number]],
            time: ['', [Validators.required, NgxBrazilValidators.time]],
            pispasep: ['', [Validators.required, NgxBrazilValidators.pispasep]],
            licensePlate: ['', [Validators.required, NgxBrazilValidators.licensePlate]],
            renavam: ['', [Validators.required, NgxBrazilValidators.renavam]],
            titulo: ['', [Validators.required, NgxBrazilValidators.titulo]]
        };
    }

    changeState(e: any): string {
        const val = e.target.value;
        return val;
    }
  
    collectValidationErrors(form: FormGroup): any {
        const errors: any = {};

        Object.keys(form.controls).forEach(key => {
            const controlErrors = form.get(key)?.errors;

            if (controlErrors) {
                errors[key] = controlErrors;
            }
        });

        return errors;
    }
  
    focusFirstInvalidControl(form: FormGroup, selector: string) {
        const formElements = document.querySelectorAll(selector);

        for (const key of Object.keys(form.controls)) {
            const control = form.get(key);

            if (control && control.invalid) {
                const invalidField = Array.from(formElements).find((element: any) => element.getAttribute('formControlName') === key);

                if (invalidField) {
                    (invalidField as HTMLElement).focus();
                    break;
                }
            }
        }
    }
  
    generate(key: string): string {
        console.log(key, fakerBr);

        if (fakerBr[key]) {
            const generatedValue = fakerBr[key]();
            return generatedValue;
        }

        return '';
    }
  
    markAllAsTouchedAndDirty(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.markAllAsTouchedAndDirty(control);
            }
        });
    }
}