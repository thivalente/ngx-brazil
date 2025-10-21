import { Component, Input } from '@angular/core';

@Component({ selector: 'app-error-container', templateUrl: './error-container.component.html', styleUrls: ['./error-container.component.scss'],
  standalone: true
})
export class ErrorContainerComponent {
  @Input() errors: any;
  @Input() fieldName: string = '';

  objectKeys(key: any) {
      if (!key)
        return [];
      
      return Object.keys(key);
  }
}
