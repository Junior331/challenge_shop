import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { Snackbar } from '@/app/contexts/Snackbar';

export type signInProps = {
  email: string;
  password: string;
  router: AppRouterInstance,
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
