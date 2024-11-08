import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { Snackbar } from "@/app/contexts/Snackbar";

export type signUpProps = {
  name: string;
  email: string;
  password: string;
  router: AppRouterInstance,
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};
