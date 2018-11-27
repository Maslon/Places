import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AngularFirestore } from "@angular/fire/firestore"
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators"
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({providedIn: "root"})

export class PlacesService {
    placesTogo: Place[] = []
    placesVisited: Place[] = []
    placesChanged = new Subject<Place[]>()
    placesSubs: Subscription[] = []
    userId: string

    constructor(private db: AngularFirestore,
                private afAuth: AngularFireAuth,
                private router: Router,
                private route: ActivatedRoute){}


    getPlaceTogo(index){
        return this.placesTogo[index]
    }

    addPlaceToDatabase(place: Place){
        if(!place.finished){
            this.addToDatabase("placesToGo" , {
                ...place,
                ownedBy: this.userId
            })
        } else {
            this.addToDatabase("placesVisited", {
                ...place
            })
        }
    }

    placeVisited(index){
        this.placesTogo[index].finished = true
        this.addPlaceToDatabase(this.placesTogo[index])
        this.db.collection("placesToGo").doc(this.placesTogo[index].id).delete()

    }

    fetchGoPlaces(){
        this.afAuth.authState.subscribe(user => this.userId = user.uid)
        this.placesSubs.push(this.db.collection("placesToGo", ref => ref.where("ownedBy", "==", this.userId))
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
            this.placesTogo = places
            this.placesChanged.next(this.placesTogo)
        }))
    }

    // fetchVisitedPlaces(){
    //     this.afAuth.authState.subscribe(user => this.userId = user.uid)
    //     this.placesSubs.push(this.db.collection("placesToGo").valueChanges()
    //     .subscribe((places: Place[]) => {
    //         this.placesVisited = places.filter(place =>> place.owned)
    //     })
    // }

    deletePlace(index){
        this.db.collection("placesToGo").doc(this.placesTogo[index].id).delete()
        this.router.navigate(["/places"])
    }

    updatePlace(place, index){
        this.db.collection("placesToGo").doc(this.placesTogo[index].id).update({
            name: place.name,
            image: place.image,
            description: place.description
        })
        this.placesChanged.next(this.placesTogo)


    }

    private addToDatabase(status, place){
        this.db.collection(status).add(place)
    }

    cancelPlaceSubs(){
        this.placesSubs.forEach(sub => sub.unsubscribe)
    }
}

