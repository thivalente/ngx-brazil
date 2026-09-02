import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-error-container',
  templateUrl: './error-container.component.html',
  styleUrls: ['./error-container.component.scss'],
  standalone: false
})
export class ErrorContainerComponent {
  readonly errors = input<any>();
  readonly fieldName = input('');

  protected readonly errorKeys = computed(() => {
    const err = this.errors();
    return err ? Object.keys(err) : [];
  });
}
