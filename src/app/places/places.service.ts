import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AngularFirestore } from "@angular/fire/firestore"
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators"
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({providedIn: "root"})

export class PlacesService {
    places: Place[] = []
    placesChanged = new Subject<Place[]>()
    placesSubs: Subscription[] = []
    private userId: string

    constructor(private db: AngularFirestore,
                private afAuth: AngularFireAuth,
                private router: Router,
                private route: ActivatedRoute){}


    getPlace(index){
        return this.places[index]
    }

    addPlaceToDatabase(place: Place){
        this.addToDatabase("placesToGo" , {
            ...place,
            ownedBy: this.userId
        })
    }

    fetchGoPlaces(){
        this.afAuth.authState.subscribe(user => this.userId = user.uid)
        this.placesSubs.push(this.db.collection("placesToGo")
        .snapshotChanges()
        .pipe(map((data) => {
            return data.map(item => {
                return {
                    ...item.payload.doc.data(),
                    id: item.payload.doc.id
                }
            })
        }))
        .subscribe((places: Place[]) => {
            this.places = places.filter(place => place.ownedBy === this.userId)
            this.placesChanged.next(this.places)
        }))
    }

    deletePlace(index){
        this.db.collection("placesToGo").doc(this.places[index].id).delete()
        this.router.navigate(["/places"])
    }

    updatePlace(place, index){
        this.db.collection("placesToGo").doc(this.places[index].id).update({
            name: place.name,
            image: place.image,
            description: place.description
        })
        this.placesChanged.next(this.places)


    }

    private addToDatabase(status, exercise){
        this.db.collection(status).add(exercise)
    }

    cancelPlaceSubs(){
        this.placesSubs.forEach(sub => sub.unsubscribe)
    }
}

