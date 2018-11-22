
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
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { NewPlaceComponent } from './places/places-togo/new-place/new-place.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    HeaderComponent,
    SideComponent,
    PlacesTogoComponent,
    PlacesVisitedComponent,
    PlaceDetailComponent,
    HomeComponent,
    NewPlaceComponent
  ],
  imports: [
    FormsModule,
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
