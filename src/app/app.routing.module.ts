import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router"
import { PlacesComponent } from './places/places.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "places", component: PlacesComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}