import { storage } from "./firebase/firebaseInit";
import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebaseInit";

export type Picture = {
  pictureURL: string;
  searchImages: {
    sImage1: string;
    sImage2: string;
    sImage3: string;
  };
};

export type Coordinates = {
  image1: {
    coordX: number;
    coordY: number;
  };
  image2: {
    coordX: number;
    coordY: number;
  };
  image3: {
    coordX: number;
    coordY: number;
  };
};

export default function usePictures(): [Picture, Coordinates] {
  const [picture, setPicture] = useState<Picture>();
  const pictureNames = ["nothing-to-declare-wimmelbild.webp"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const getRandomIndex = () => {
    const index = Math.floor(Math.random() * pictureNames.length);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const getFiles = async () => {
      const currentPicture: Picture = {
        pictureURL: "",
        searchImages: { sImage1: "", sImage2: "", sImage3: "" },
      };
      getRandomIndex();
      const pathReference = ref(
        storage,
        `picture_${currentIndex + 1}/${pictureNames[currentIndex]}`
      );
      const url = await getDownloadURL(pathReference);
      currentPicture.pictureURL = url;

      const searchImagesReference1 = ref(
        storage,
        `picture_${currentIndex + 1}/search_images/search1.png`
      );
      const searchURL1 = await getDownloadURL(searchImagesReference1);
      currentPicture.searchImages.sImage1 = searchURL1;

      const searchImagesReference2 = ref(
        storage,
        `picture_${currentIndex + 1}/search_images/search2.png`
      );
      const searchURL2 = await getDownloadURL(searchImagesReference2);
      currentPicture.searchImages.sImage2 = searchURL2;

      const searchImagesReference3 = ref(
        storage,
        `picture_${currentIndex + 1}/search_images/search3.png`
      );
      const searchURL3 = await getDownloadURL(searchImagesReference3);
      currentPicture.searchImages.sImage3 = searchURL3;

      setPicture(currentPicture);
    };
    getFiles();
  }, []);

  useEffect(() => {
    const getCoords = async () => {
      const coordinatesRef = doc(
        db,
        "coordinates",
        `picture_${currentIndex + 1}`
      );
      const coordinatesSnap = (await getDoc(coordinatesRef)).data();
      setCoordinates(coordinatesSnap as Coordinates);
    };
    getCoords();
  }, []);

  return [picture!, coordinates!];
}
