
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout"
import { PlacesComponent } from './places/places.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SideComponent } from './navigation/side/side.component';
import { PlacesTogoComponent } from './places/places-togo/places-togo.component';
import { PlacesVisitedComponent } from './places/places-visited/places-visited.component';
import { PlaceDetailComponent } from './places/places-togo/place-detail/place-detail.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    HeaderComponent,
    SideComponent,
    PlacesTogoComponent,
    PlacesVisitedComponent,
    PlaceDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
