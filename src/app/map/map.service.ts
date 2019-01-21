import { PlacesService } from './../places/places.service';
import { Place } from './../places/place.model';
import { Injectable } from "@angular/core";
import wiki from "wikijs"

@Injectable({providedIn: "root"})

export class MapService{
    cityName: string
    city: Place
    

    constructor(private placesService: PlacesService){}
    

    getCityName(name){
        this.cityName = name.split(/[, -]/)[0]
    }


    fetchImages(){
        return wiki().page(this.cityName)
        .then(page => page.images())
        .then(results => results.filter(image => image.includes(this.cityName) && image.includes("jpg")))
    }

    

    async getRandomImages(){
        const images = await this.fetchImages()
        const randomImages = []
        console.log("images", images)
        if(images.length >= 10){
            for(let i = 0; i < 10; i++){
                const ind = Math.floor(Math.random() * images.length)
                randomImages.push(images[ind])
                images.splice(ind, 1)
            }
        } else {
            for(let i = 0; i <= images.length; i++){
                const ind = Math.floor(Math.random() * images.length)
                randomImages.push(images[ind])
                images.splice(ind, 1)
            }    
        }
        return randomImages
    }

    async setCityData(){
        await this.getRandomImages()
        console.log("random images", this.getRandomImages())
    }

    async createCity(){
        if(!this.cityName){
            alert("pick a city")
        } else {
            this.placesService.addPlaceToDatabase({
                name: this.cityName,
                images: await this.getRandomImages(),
                description: "brrrap"
            })
            this.cityName = null;    
        }
    }



}