import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    //   { path: 'display', loadChildren: './display/display.module#DisplayPageModule' },
    // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: '', loadChildren: './menu/menu.module#MenuPageModule'},
    // { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
    // { path: 'online', loadChildren: './online/online.module#OnlinePageModule' },
    // { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    // { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
