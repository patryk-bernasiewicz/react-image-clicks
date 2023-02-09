import { createContext, ReactNode, useMemo, useState } from "react";
import { useImageUrls } from "../hooks/useImageUrls";

const DEFAULT_IMAGES_LENGTH = 12;
const DEFAULT_MAX_CLICKS = 5;

type ImagesContextValues = {
  imageUrls: string[];
  handleImageClick: (index: number) => void;
  getImageClicks: (index: number) => void;
  totalImageClicks: number;
  isAtMaxClicks: (index: number) => boolean;
  resetAllClicks: () => void;
};

export const ImagesContext = createContext<ImagesContextValues>({
  imageUrls: [],
  handleImageClick: () => null,
  getImageClicks: () => null,
  totalImageClicks: 0,
  isAtMaxClicks: () => false,
  resetAllClicks: () => null,
});

export const ImagesContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [imagesLength] = useState(DEFAULT_IMAGES_LENGTH);
  const [maxClicks] = useState<number | undefined>(DEFAULT_MAX_CLICKS);
  const { imageUrls, regenerateImage } = useImageUrls(300, imagesLength);

  const [imageClicks, setImageClicks] = useState<number[]>(
    [...new Array(imagesLength)].map(() => 0)
  );

  const getImageClicks = (index: number) => {
    return imageClicks[index] ?? 0;
  };

  const handleImageClick = (index: number) => {
    setImageClicks((prevState) => {
      if (maxClicks && prevState[index] >= maxClicks) {
        return prevState;
      }

      return [
        ...prevState.slice(0, index),
        prevState[index] + 1,
        ...prevState.slice(index + 1),
      ];
    });
    regenerateImage(index);
  };

  const isAtMaxClicks = (index: number) => {
    return !!maxClicks && imageClicks[index] >= maxClicks;
  };

  const resetAllClicks = () => {
    setImageClicks([...new Array(imagesLength)].map(() => 0));
  };

  const totalImageClicks = useMemo(() => {
    return imageClicks.reduce(
      (previousValue, currentClick) => previousValue + currentClick,
      0
    );
  }, [imageClicks]);

  return (
    <ImagesContext.Provider
      value={{
        imageUrls,
        handleImageClick,
        getImageClicks,
        totalImageClicks,
        isAtMaxClicks,
        resetAllClicks,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
