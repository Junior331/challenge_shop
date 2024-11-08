import Image from "next/image";

import { LayoutProps } from "./@types";
import { Snackbar } from "../../modules";
import { images } from "@/app/assets/images";
import { ControllerTheme } from "../../elements";

export const LayoutAbstract = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen min-h-screen flex items-start justify-between bg-background">
      <Snackbar />
      <div className="w-full h-full min-h-screen flex items-center justify-center max-[768px]:hidden px-5">
        <Image
          className="size-[60%]"
          alt="Image illustration"
          src={images.illustration}
        />
        <ControllerTheme className="absolute top-2 left-2 " />
      </div>

      <div className="w-[50%] min-w-[450px] h-screen flex items-start justify-end bg-card max-[768px]:w-full max-[768px]:min-w-0">
        <div className="w-full h-auto flex flex-col items-center justify-center gap-7 m-auto px-10 py-0">
          {children}
        </div>
      </div>
    </div>
  );
};
