import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AngularFirestore } from "@angular/fire/firestore"
import { Subject, Subscription } from "rxjs";

@Injectable({providedIn: "root"})

export class PlacesService {
    places: Place[] = []
    placesChanged = new Subject<Place[]>()
    placesSubs: Subscription[] = []

    constructor(private db: AngularFirestore){}

   

    getPlace(index){
        return this.places[index]
    }

    addPlaceToDatabase(place: Place){
        this.addToDatabase("placesToGo" , {
            ...place
        })
    }

    fetchGoPlaces(){
        this.placesSubs.push(this.db.collection("placesToGo").valueChanges().subscribe((places: Place[]) => {
            this.places = places
            this.placesChanged.next(this.places)
        }))
    }

    deletePlace

    private addToDatabase(status, exercise){
        this.db.collection(status).add(exercise)
    }

    cancelPlaceSubs(){
        this.placesSubs.forEach(sub => sub.unsubscribe)
    }
}

