import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: GuestComponent,
    loadChildren: () =>
      import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'orders/overview',
        loadComponent: () => import('./demo/elements/element-color copy/order-color.component')
      },
      {
        path: 'orders/status',
        loadComponent: () => import('./demo/order-status/order-management.component')
      },

      // --- Add these routes for Order CRUD ---
      {
        path: 'orders/create',
        loadComponent: () => import('./demo/order-status/order-create/order-create.component')
      },
      {
        path: 'orders/:orderId/edit',
        loadComponent: () => import('./demo/order-status/order-edit/order-edit.component').then(m => m.OrderEditComponent)
      },
      {
        path: 'orders/:orderId/view',
        loadComponent: () => import('./demo/order-status/order-view/order-view.component').then(m => m.OrderViewComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
