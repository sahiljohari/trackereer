import { ReactNode } from "react";
import HeaderBar from "components/HeaderBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="max-w-7xl mx-auto my-0">
    <HeaderBar name="Sahil" />
    {children}
  </div>
);

export default Layout;
