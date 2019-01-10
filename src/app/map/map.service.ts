import { Place } from './../places/place.model';
import { Injectable } from "@angular/core";
import wiki from "wikijs"

@Injectable({providedIn: "root"})

export class MapService{
    cityName: string
    city: Place
    

    getCityName(name){
        this.cityName = name.split(/[, -]/)[0]
    }

    getMainImageName(){
        return wiki().page(this.cityName)
        .then(page => page.fullInfo())
        .then((result: any) => result.general.imageSkyline)
    }

    getImages(){
        return wiki().page(this.cityName)
        .then(page => page.images())
        .then(results => results)
    }

    async getMainImage(){
        const images = await this.getImages()
        const mainImageName = await this.getMainImageName()
        const imageNameArr = mainImageName.split(" ")
        let mainImage

        images.forEach(image => {
            if(image.includes(imageNameArr[imageNameArr.length - 1]) &&  image.includes(imageNameArr[imageNameArr.length - 2])) {
                mainImage = image
            }
        })

        console.log(mainImageName)
        console.log(images)
        console.log(imageNameArr)
        console.log(mainImage)

    }

    async setCityData(){

    }
}