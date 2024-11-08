import { ReactNode } from 'react';

export type Props = {
  open: boolean;
  loading: boolean;
  children: ReactNode;
  handleClose: () => void;
  handleConfirm:  () => void;
  textButtonPrimary?: string;
  textButtonSecondary?: string;
};