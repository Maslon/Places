import { PlacesService } from './../places/places.service';
import { Place } from './../places/place.model';
import { Injectable } from "@angular/core";
import wiki from "wikijs"
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface Info {
    general: {
        website: string
    }
}

@Injectable({providedIn: "root"})


export class MapService{
    cityName: string
    city: Place
    cityCoordinates: number[]
    showAlert = new Subject<string>()
    
    

    constructor(private placesService: PlacesService,
                private router: Router){}
    

    getCityName(name){
        this.cityName = name.split(/[, -]/)[0]
    }

    getCoordinates(latlng){
        this.cityCoordinates = [latlng.lat, latlng.lng]      
    }


    fetchImages(){
        return wiki().page(this.cityName)
        .then(page => page.images())
        .then(results => results.filter(image => image.includes(this.cityName) && image.includes("jpg")))
    }
    

    async getRandomImages(){
        const images = await this.fetchImages()
        const randomImages = []
        if(images.length >= 10){
            for(let i = 0; i <= 10; i++){
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

    getCityData(text, latlng){
        this.getCityName(text)
        this.fetchImages()
        this.getCoordinates(latlng)      
    }

    getCitySummary(){
        return wiki().page(this.cityName)
            .then(page => page.summary())
            .then(result => result)
    }

    getWebsite(){
        return wiki().page(this.cityName)
            .then(page => page.fullInfo())
            .then((result: Info ) => result.general.website.split(" ")[0].slice(1))
    }

    async createCity(){
        if(!this.cityName){
            this.showAlert.next("pick")
            setTimeout(() => this.showAlert.next(null), 3000)
        } else if(this.placesService.getPlaceNames().includes(this.cityName)){
            this.showAlert.next("created")
            setTimeout(() => this.showAlert.next(null), 3000)
        }
        else {
            this.placesService.addPlaceToDatabase({
                name: this.cityName,
                images: await this.getRandomImages(),
                description: await this.getCitySummary(),
                coordinates: this.cityCoordinates,
                website: await this.getWebsite(),
                notes: []
            })
            this.cityName = null;    
        }
    }

    



}