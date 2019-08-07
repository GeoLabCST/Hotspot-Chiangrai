import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'fullmap', loadChildren: './fullmap/fullmap.module#FullmapPageModule' },
  { path: 'amphoe', loadChildren: './amphoe/amphoe.module#AmphoePageModule' },
  { path: 'report7day', loadChildren: './report7day/report7day.module#Report7dayPageModule' },  { path: 'tambon', loadChildren: './tambon/tambon.module#TambonPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
