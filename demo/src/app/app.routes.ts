import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./demo/demo.component').then(m => m.DemoComponent) }
];
