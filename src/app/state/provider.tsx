import React, { ReactNode } from "react";
import { SearchProvider } from "../contexts/Search";
import { SnackbarProvider } from "../contexts/Snackbar";

type ProviderType = {
  children: ReactNode;
};

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <SnackbarProvider>
      <SearchProvider>{children}</SearchProvider>
    </SnackbarProvider>
  );
};

export default Provider;
