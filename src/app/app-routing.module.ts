import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './page/detail/detail.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[LoginGuard]},
  {path:'login', component:LoginComponent},
  {path:'detail/:id', component:DetailComponent},
  
  {path:'', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
