// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen  font-inter">
      <Header />
      <div className="flex-grow bg-gray-200 px-6 md:px-[12vw] pt-8">
        <Outlet />
      </div>
    </div>
  );
}
