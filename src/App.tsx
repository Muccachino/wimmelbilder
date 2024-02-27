
import './App.css'
import usePictures from './usePictures'


function App() {
const [picture] = usePictures();

  return (
    <>
      <img src={picture?.pictureURL} />
      <img src={picture?.searchImages.sImage1} />
      <img src={picture?.searchImages.sImage2} />
      <img src={picture?.searchImages.sImage3} />
    </>
  )
}

export default App
