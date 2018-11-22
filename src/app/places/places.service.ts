import { Injectable } from "@angular/core";
import { Place } from "./place.model";

@Injectable({providedIn: "root"})

export class PlacesService {
    places: Place[] = [
        {
          name: "vidlakov",
          description: "pesky",
          picture: "https://www.milujemefotografii.cz/wp-content/uploads/2018/06/jak-fotit-krajinu-v-ruznych-podminkach-I-krajina-rano-vecer-i-v-noci-640x360.jpg",
          finished: false
        },
        {
          name: "vidlakwafwov",
          description: "peskwfawfay",
          picture: "https://www.milujemefotografii.cz/wp-content/uploads/2018/06/jak-fotit-krajinu-v-ruznych-podminkach-I-krajina-rano-vecer-i-v-noci-640x360.jpg",
          finished: false
        }
    ]

    getPlaces(){
        return this.places.slice()
    }

    getPlace(index){
        return this.places[index]
    }
}

