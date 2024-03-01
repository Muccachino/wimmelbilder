import { useEffect, useRef, useState, MouseEvent } from "react";
import usePictures from "./usePictures";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

interface Props {
  gameWon: (
    imagesFound: { image1: boolean; image2: boolean; image3: boolean },
    time: number
  ) => void;
}

export default function Game({ gameWon }: Props) {
  const [picture, coordinates] = usePictures();
  const [counter, setCounter] = useState(0);
  const [imagesFound, setImagesFound] = useState({
    image1: false,
    image2: false,
    image3: false,
  });
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    const container = imageContainerRef.current;
    if (!container) return;
    const containerBounds = container.getBoundingClientRect();
    const relativeMouseX =
      Math.round(
        ((event.clientX - containerBounds.left) / containerBounds.width) *
          100 *
          100
      ) / 100;
    const relativeMouseY =
      Math.round(
        ((event.clientY - containerBounds.top) / containerBounds.height) *
          100 *
          100
      ) / 100;

    console.log(
      `Relative Mausposition im Container: x=${relativeMouseX}, y=${relativeMouseY}`
    );

    if (
      relativeMouseX > coordinates.image1.coordX - 3 &&
      relativeMouseX < coordinates.image1.coordX + 3 &&
      relativeMouseY > coordinates.image1.coordY - 3 &&
      relativeMouseY < coordinates.image1.coordY + 3
    ) {
      console.log("Event!!!");
      setImagesFound((prev) => ({
        ...prev,
        image1: true,
      }));
    }

    if (
      relativeMouseX > coordinates.image2.coordX - 3 &&
      relativeMouseX < coordinates.image2.coordX + 3 &&
      relativeMouseY > coordinates.image2.coordY - 3 &&
      relativeMouseY < coordinates.image2.coordY + 3
    ) {
      console.log("Event!!!");
      setImagesFound((prev) => ({
        ...prev,
        image2: true,
      }));
    }
    if (
      relativeMouseX > coordinates.image3.coordX - 3 &&
      relativeMouseX < coordinates.image3.coordX + 3 &&
      relativeMouseY > coordinates.image3.coordY - 3 &&
      relativeMouseY < coordinates.image3.coordY + 3
    ) {
      console.log("Event!!!");
      setImagesFound((prev) => ({
        ...prev,
        image3: true,
      }));
    }
  };

  return (
    <>
      <header id="header">
        {!imagesFound.image1 ? (
          <img src={picture?.searchImages.sImage1} height={100} width={150} />
        ) : (
          <div
            style={{
              width: 150,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineOutlinedIcon
              fontSize="large"
              sx={{ color: "green" }}
            />
          </div>
        )}
        {!imagesFound.image2 ? (
          <img src={picture?.searchImages.sImage2} height={100} width={150} />
        ) : (
          <div
            style={{
              width: 150,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineOutlinedIcon
              fontSize="large"
              sx={{ color: "green" }}
            />
          </div>
        )}
        {!imagesFound.image3 ? (
          <img src={picture?.searchImages.sImage3} height={100} width={150} />
        ) : (
          <div
            style={{
              width: 150,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineOutlinedIcon
              fontSize="large"
              sx={{ color: "green" }}
            />
          </div>
        )}

        <div>
          <p>{counter}</p>
        </div>
      </header>

      <div ref={imageContainerRef} id="picture-container">
        <img
          id="gamePicture"
          src={picture?.pictureURL}
          onClick={(e) => {
            handleClick(e);
            gameWon(imagesFound, counter);
          }}
        />
      </div>
    </>
  );
}
