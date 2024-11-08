import logoOutline from "./logo_outline.png";
import fallback from "./image_not_found.png";
import illustration from "./Illustration.svg";

export const images = {
  fallback,
  logoOutline,
  illustration,
};

type IImage = keyof typeof images;

export const getImage = (id: IImage) => {
  return images[id] ?? images.fallback;
};
