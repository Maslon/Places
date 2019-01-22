import { AuthGuard } from './authentication/auth-guard';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router"
import { PlacesComponent } from './places/places.component';
import { NgModule } from '@angular/core';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "places", component: PlacesComponent, canActivate: [AuthGuard]},
    { path: "places/:id", component: PlaceDetailComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "map", component: MapComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {

}