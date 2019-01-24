import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AngularFirestore } from "@angular/fire/firestore"
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators"
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})

export class PlacesService {
    placesTogo: Place[] = []
    placesVisited: Place[] = []
    placesTogoChanged = new Subject<Place[]>()
    placesVisitedChanged = new Subject<Place[]>()
    placesSubs: Subscription[] = []
    private userId: string

    constructor(private db: AngularFirestore,
                private afAuth: AngularFireAuth,
                private router: Router){}


    getPlaceTogo(index){
        return this.placesTogo[index]
    }

    getVisitedPlace(index){
        return this.placesVisited[index]
    }

    async addPlaceToDatabase(place){
        await this.setPlaces()
        if(!place.finished){
            this.addToDatabase("placesToGo" , {
                ...place,
                finished: false,
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
        this.router.navigate(["/places"])
    }

    placeGoAgain(index){
        console.log(this.placesVisited[index])       
        console.log(this.placesVisited[index].id) 
        this.placesVisited[index].finished = false      
        this.addPlaceToDatabase(this.placesVisited[index])
        this.db.collection("placesVisited").doc(this.placesVisited[index].id).delete()
        this.router.navigate(["/places"])
    }

    setPlaces(){
        this.afAuth.authState.subscribe(user => {
            this.userId = user.uid
            this.fetchGoPlaces()
            this.fetchVisitedPlaces()
        })
    }

    fetchGoPlaces(){
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
            this.placesTogoChanged.next(this.placesTogo)
        }))
    }

    fetchVisitedPlaces(){
        this.afAuth.authState.subscribe(user => this.userId = user.uid)
        this.placesSubs.push(this.db.collection("placesVisited", ref => ref.where("ownedBy", "==", this.userId))
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
            this.placesVisited = places
            this.placesVisitedChanged.next(this.placesVisited)
        }))
    }

    deletePlace(index, visited){
        if(visited){
            this.db.collection("placesVisited").doc(this.placesVisited[index].id).delete()
        } else {
            this.db.collection("placesToGo").doc(this.placesTogo[index].id).delete()
        }
        this.router.navigate(["/places"])

    }


    // updatePlace(place, index){
    //     this.db.collection("placesToGo").doc(this.placesTogo[index].id).update({
    //         name: place.name,
    //         image: place.image,
    //         description: place.description
    //     })
    //     this.placesTogoChanged.next(this.placesTogo)
    // }

    private addToDatabase(status, place){
        this.db.collection(status).add(place)
    }

  

    cancelPlaceSubs(){
        this.placesSubs.forEach(sub => sub.unsubscribe())
    }
}

