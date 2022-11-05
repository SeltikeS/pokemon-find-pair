import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesEnum } from './entities/enums/pages.enum';

const routes: Routes = [
  {path: '', redirectTo: PagesEnum.MAIN, pathMatch: 'full'},
  {
    path: PagesEnum.MAIN,
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: PagesEnum.PLAY,
    loadChildren: () => import('./pages/playground/playground.module').then(m => m.PlaygroundModule),
  },
  {
    path: PagesEnum.SETTINGS,
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
