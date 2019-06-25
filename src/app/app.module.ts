import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarComponent } from './menubar/menubar.component';
import { GridComponent } from './grid/grid.component';
import { GeneralMobilityFormComponent } from './general-mobility-form/general-mobility-form.component';
import { MenuService } from 'src/app/services/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    GridComponent,
    GeneralMobilityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
