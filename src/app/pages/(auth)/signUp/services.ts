/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/app/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signUpProps } from "./@types";

export const signUp = async ({
  name,
  email,
  router,
  password,
  setLoading,
  setSnackbar,
}: signUpProps) => {
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const resultUserCredential = await updateProfile(user, {
      displayName: name,
    });
    router.push("/");
    return resultUserCredential;
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
