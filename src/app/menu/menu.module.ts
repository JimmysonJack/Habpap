import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import {MenuRoutingModule} from "./menu-routing.module";

import {HomePageModule} from "../home/home.module";
import {DisplayPageModule} from "../display/display.module";
import {RegisterPageModule} from "../register/register.module";

import {LoginPageModule} from "../login/login.module";
import {ReportPageModule} from "../report/report.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MenuRoutingModule,
        HomePageModule,
        DisplayPageModule,
        RegisterPageModule,
        ReportPageModule,
    ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
