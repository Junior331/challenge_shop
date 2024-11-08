import edit from "./edit.svg";
import trash from "./trash.svg";
import close from "./close.svg";
import eye from "./eye.svg";
import eye_slash from "./eye_slash.svg";
import fallback from "./image_not_found.png";
import alertTriangle from "./alert_triangle.svg";

import info from "./info.svg";
import error from "./error.svg";
import success from "./success.svg";
import warning from "./warning.svg";

export const icons = {
  eye,
  info,
  error,
  edit,
  close,
  trash,
  warning,
  success,
  fallback,
  eye_slash,
  alertTriangle,
};
type IIcons = keyof typeof icons;

export const getImage = (id: IIcons) => {
  return icons[id] ?? icons.fallback;
};
