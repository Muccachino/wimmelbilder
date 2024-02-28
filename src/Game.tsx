import { useEffect, useRef, useState, MouseEvent } from "react";
import usePictures from "./usePictures";


export default function Game() {

  const [picture] = usePictures();
  const [counter, setCounter] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null)

  const testCoords = {
    image1: {
      coordX: 200,
      coordY: 200
    },
    image2: {
      coordX: 400,
      coordY: 400
    },
    image3: {
      coordX: 600,
      coordY: 600
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 1000)

    return () => clearInterval(interval);
  })

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {

    const container = imageContainerRef.current;
    if (!container) return;
  
    const baseWidth = 1905;
    const baseHeight = 1545;
  
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
  
/*     const mouseXPercentage = (event.clientX - container.offsetLeft) / containerWidth * 100;
    const mouseYPercentage = (event.clientY - container.offsetTop) / containerHeight * 100; */
  
    const widthChangePercentage = (containerWidth / baseWidth - 1) * 100;
    const heightChangePercentage = (containerHeight / baseHeight - 1) * 100;
    const modifierX = Math.abs(widthChangePercentage / 100);
    const modifierY = Math.abs(heightChangePercentage / 100);
    let xCoord, yCoord

    if (widthChangePercentage >= 0) {
      xCoord = event.clientX + (event.clientX * modifierX)
      yCoord = event.clientY + (event.clientY * modifierY)
    } else {
      xCoord = event.clientX - (event.clientX * modifierX)
      yCoord = event.clientY - (event.clientY * modifierY)
    }

  
    console.log('Prozentuale Mausklick-Koordinaten:', { x: xCoord, y: yCoord });
    console.log('Breitenänderung in Prozent:', widthChangePercentage);
    console.log('Höhenänderung in Prozent:', heightChangePercentage);
    console.log("modifierX: " + modifierX, "modifierY: " + modifierY)
/* 
    const mouseX = event.pageX;
    const mouseY = event.pageY + 130;

    console.log("X:" + mouseX, "Y:" + mouseY)

    if ((mouseX > (testCoords.image1.coordX - 30) && mouseX < (testCoords.image1.coordX + 30) && mouseY > (testCoords.image1.coordY - 30) && mouseY < (testCoords.image1.coordY + 30)) || 
        (mouseX > (testCoords.image2.coordX - 30) && mouseX < (testCoords.image2.coordX + 30) && mouseY > (testCoords.image2.coordY - 30) && mouseY < (testCoords.image2.coordY + 30)) ||
        (mouseX > (testCoords.image3.coordX - 30) && mouseX < (testCoords.image3.coordX + 30) && mouseY > (testCoords.image3.coordY - 30) && mouseY < (testCoords.image3.coordY + 30))) {
      console.log("Event!!!")
    } */
  }


  return(
    <>
      <header id="header">
        <img src={picture?.searchImages.sImage1} height={100}/>
        <img src={picture?.searchImages.sImage2} height={100}/>
        <img src={picture?.searchImages.sImage3} height={100}/>

        <div>
          <p>{counter}</p>
        </div>
      </header>

      <div ref={imageContainerRef} id="picture-container">
        <img id="gamePicture" src={picture?.pictureURL} onClick={(e) => handleClick(e)} />
      </div>    
    </>
  )
}