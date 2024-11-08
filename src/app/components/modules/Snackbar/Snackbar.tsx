"use client";

import { useContext, useEffect } from "react";
import { SnackbarContext } from "@/app/contexts/Snackbar";
import { icons } from "@/app/assets/icons";
import Image from "next/image";

const Snackbar = () => {
  const { snackbar, closeSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (snackbar.isOpen) {
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 3000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbar.isOpen]);

  return (
    <>
      {snackbar.isOpen && (
        <div className="toast toast-top toast-end z-10">
          <div className={`alert alert-${snackbar.severity} text-white`}>
            <Image
              className="size-5 invert-[1]"
              alt={`Image ${snackbar.severity}`}
              src={icons[`${snackbar.severity}` as keyof typeof icons]}
            />
            <span>{snackbar.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export { Snackbar };
