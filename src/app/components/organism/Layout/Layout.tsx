import { Header, Snackbar } from "../../modules";
import { LayoutProps } from "./@types";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-between">
      <Snackbar />
        <div className="w-full h-auto items-center justify-items-center min-h-screen overflow-hidden">
          <Header />
          {children}
      </div>
    </div>
  );
};
