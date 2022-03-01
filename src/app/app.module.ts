import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CascadeModule} from "../../projects/cascade/src/lib/cascade.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CascadeModule,
        CascadeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
