import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NGX_BRAZIL_VERSION } from './ngx-brazil-version';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-brazil';
  version = NGX_BRAZIL_VERSION;
}
