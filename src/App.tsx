import { useContext } from "react";
import Image from "./components/Image/Image";
import ImagesGrid from "./components/ImagesGrid/ImagesGrid";
import ResetClicksButton from "./components/ResetClicksButton/ResetClicksButton";
import TotalClicksCounter from "./components/TotalClicksCounter/TotalClicksCounter";
import { ImagesContext } from "./context/ImagesContext";

const App = () => {
  const { getImageClicks, handleImageClick, imageUrls, isAtMaxClicks } =
    useContext(ImagesContext);

  return (
    <div className="App">
      <ResetClicksButton />
      <ImagesGrid>
        {imageUrls.map((url, index) => {
          const imageClicks = getImageClicks(index);
          const hasMaxClicks = isAtMaxClicks(index);
          return (
            <Image
              key={index}
              url={url}
              onClick={() => handleImageClick(index)}
              alt="A picture of a random thing"
              disabled={hasMaxClicks}
            >
              <>
                Regenerated {imageClicks} times
                <br />
                {hasMaxClicks
                  ? "Max regenerations reached!"
                  : "Click to regenerate image"}
              </>
            </Image>
          );
        })}
      </ImagesGrid>
      <TotalClicksCounter />
    </div>
  );
};

export default App;
