import { useEffect, useState } from "react";

const DEFAULT_SIZE = 300;
const DEFAULT_IMAGES_LENGTH = 10;
const BASE_URL = "https://picsum.photos";

const getPseudrandomSeeds = (count: number, seed?: number): string[] => {
  return [...Array(count)].map((_, index) => {
    return Math.floor(Math.sin((index + 1) * (seed ?? 1)) * 1000000).toString();
  });
};

export const useImageUrls = (
  imageSize = DEFAULT_SIZE,
  length = DEFAULT_IMAGES_LENGTH
) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const seeds = getPseudrandomSeeds(length);
    const urls = seeds.map((seed) => `${BASE_URL}/seed/${seed}/${imageSize}`);
    setImageUrls(urls);
  }, [imageSize, length]);

  const regenerateImage = (index: number) => {
    setImageUrls((images) => {
      const randomSeed = Math.floor(Math.random() * 100000);
      const newSeed = getPseudrandomSeeds(1, randomSeed);

      return [
        ...images.slice(0, index),
        `${BASE_URL}/seed/${newSeed}/${imageSize}`,
        ...images.slice(index + 1),
      ];
    });
  };

  return { imageUrls, regenerateImage };
};
