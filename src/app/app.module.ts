import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarComponent } from './menubar/menubar.component';
import { LogicMobilityFormComponent } from './logic-mobility-form/logic-mobility-form.component';
import { FormsService } from './services/forms.service';
import { GridComponent } from './grid/grid.component';
import { GeneralMobilityFormComponent } from './general-mobility-form/general-mobility-form.component';
import { MenuService } from 'src/app/services/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    LogicMobilityFormComponent,
    GridComponent,
    GeneralMobilityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FormsService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
