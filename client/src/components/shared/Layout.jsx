import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
    return (
        <>
            {/* <div className="flex flex-row h-screen w-screen overflow-hidden">
                <aside>
                    <Sidebar />
            
                </aside>
               
                <div className="p-8 w-full">{<Outlet />}</div>
            </div> */}

            <div className="flex flex-row h-screen w-screen overflow-hidden">
                <Sidebar />
                <div className="p-8 w-full ">
                    <Header />
                    <div className=" w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
