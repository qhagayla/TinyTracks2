import React from "react";
import getTime from "@/services/api/getTime.js";

export default function Header() {
    return (
        <>
            {/*header*/}
            <div className="flex justify-between items-center sm-5">
                <h1 className="text-3xl font-bold">Greetings!</h1>
                <p className="text-xl font-semibold">
                    {getTime().toLocaleTimeString()}
                </p>
            </div>
            <hr />
            <br />
        </>
    );
}
