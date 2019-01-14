import { PlacesService } from './../places/places.service';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth"
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})

export class AuthService {
    private isAuth = false
    logState = new Subject<boolean>()

    constructor(private afAuth: AngularFireAuth,
                private router: Router,
                private placesService: PlacesService){}


    initAuth(){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.isAuth = true
                this.logState.next(true)
                this.router.navigate(["/map"])
            } else {
                this.isAuth = false
                this.logState.next(false)
                this.router.navigate(["/"])
                this.placesService.cancelPlaceSubs()
            }
        })
    }

    registerUser(authData: AuthData){
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        this.router.navigate(["/places"])
    }

    loginUser(authData: AuthData){
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        this.router.navigate(["/places"])
    }

    logout(){
        this.afAuth.auth.signOut()
    }

    isAuthenticated(){
        return this.isAuth
    }
}