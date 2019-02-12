import { MapComponent } from './map/map.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PlaceItemComponent } from './places/place-item/place-item.component';
import { DeletePlaceComponent } from './places/place-detail/delete-place.component';

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
    RegisterComponent,
    LoginComponent,
    PlaceItemComponent,
    MapComponent,
    DeletePlaceComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeletePlaceComponent]
})
export class AppModule { }
