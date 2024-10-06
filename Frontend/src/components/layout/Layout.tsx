import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen justify-between text-base">
      <Topbar />
      <main className="mb-auto p-4">{children || <Outlet />}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        POC Project - © 2024 Spring - React MASL
      </footer>
    </div>
  );
}
