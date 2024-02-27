import { storage } from "./firebase/firebaseInit"
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';

 export type Picture = {
    pictureURL: string,
    searchImages: {
        sImage1: string,
        sImage2: string,
        sImage3: string
    }
}

export default function usePictures() {
    const [picture, setPicture] = useState<Picture>();
    const pictureNames = ["nothing-to-declare-wimmelbild.webp"]
  
    const getRandomIndex = () => {
      const index = Math.floor(Math.random()*pictureNames.length);
      return index
    }
  
    useEffect(() => {
        const getFiles = async () => {
            const currentPicture: Picture = {pictureURL: "", searchImages: {sImage1: "", sImage2: "", sImage3: ""}}
            const index = getRandomIndex();
            const pathReference = ref(storage, `picture_${index+1}/${pictureNames[index]}`);
            const url = await getDownloadURL(pathReference)
            currentPicture.pictureURL = url
            
            const searchImagesReference1 = ref(storage,`picture_${index+1}/search_images/search1.png`)
            const searchURL1 = await getDownloadURL(searchImagesReference1)
            currentPicture.searchImages.sImage1 = searchURL1
        
            const searchImagesReference2 = ref(storage,`picture_${index+1}/search_images/search2.png`)
            const searchURL2 = await getDownloadURL(searchImagesReference2)
            currentPicture.searchImages.sImage2 = searchURL2
        
            const searchImagesReference3 = ref(storage,`picture_${index+1}/search_images/search3.png`)
            const searchURL3 = await getDownloadURL(searchImagesReference3)
            currentPicture.searchImages.sImage3 = searchURL3
        
            setPicture(currentPicture)
        
          }
        getFiles()
    }, [])


    
    return [picture]
}
