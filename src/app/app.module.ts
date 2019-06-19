import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarComponent } from './menubar/menubar.component';
import { LogicMobilityFormComponent } from './logic-mobility-form/logic-mobility-form.component';
import { FormsService } from './services/forms.service';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    LogicMobilityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
