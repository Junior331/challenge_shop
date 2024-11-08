/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/app/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { signInProps } from "./@types";

export const signIn = async ({
  email,
  router,
  password,
  setLoading,
  setSnackbar,
}: signInProps) => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    router.push("/pages/products");
    return userCredential;
  } catch (error: any) {
    setSnackbar({
      isOpen: true,
      severity: "error",
      vertical: "bottom",
      horizontal: "left",
      message: error.response.data.message,
    });
    throw error;
  } finally {
    setLoading(false);
  }
};
