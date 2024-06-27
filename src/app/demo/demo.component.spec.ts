import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
import { routes } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxBrazil, TextMask } from '../../../ngx-brazil/src/public_api';

describe('DemoComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TextMask.TextMaskModule,
        NgxBrazil.forRoot(),
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        DemoComponent
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(DemoComponent);
    const app = fixture.debugElement.componentInstance;
  });
});
