import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router"
import { PlacesComponent } from './places/places.component';
import { NgModule } from '@angular/core';
import { PlaceDetailComponent } from './places/places-togo/place-detail/place-detail.component';

const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "places", component: PlacesComponent},
    { path: "places/:id", component: PlaceDetailComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}