import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clubhouse',
    pathMatch: 'full'
  },
  {
    path: 'clubhouse',
    loadChildren: () => import('./features/clubhouse/clubhouse.module').then(m => m.ClubhouseModule),
  },
  {
    path: 'toggl',
    loadChildren: () => import('./features/toggl/toggl.module').then(m => m.TogglModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
