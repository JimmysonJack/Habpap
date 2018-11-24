import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomePage} from "../home/home.page";
import {DisplayPage} from "../display/display.page";
import {RegisterPage} from "../register/register.page";
import {MenuPage} from "./menu.page";
import {LoginPage} from "../login/login.page";
import {ReportPage} from "../report/report.page";

const routes: Routes = [
    {
        path: 'menu',
        component: MenuPage,
        children: [
            {
                path: 'home',
                outlet: 'menucontent',
                component: HomePage,
            },
            {
                path: 'display',
                outlet: 'menucontent',
                component: DisplayPage,
            },
            {
                path: 'register',
                outlet: 'menucontent',
                component: RegisterPage,
            },
            {
                path: 'report',
                outlet: 'menucontent',
                component: ReportPage,
            }
        ]
    },
    {
        path: '',
        redirectTo: '/menu/(menucontent:home)'
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  // declarations: []
    exports: [RouterModule]
})
export class MenuRoutingModule { }
