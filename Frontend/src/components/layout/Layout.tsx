import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between text-base">
      <Topbar />
      <main className="mb-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        POC Project - © 2024 Spring - React MASL
      </footer>
    </div>
  );
}
