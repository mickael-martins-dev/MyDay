import React from "react";
import Navbar from "../../components/NavBar";

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}

const BaseLayout = (props: IProps) => {
    return (
        <main className="w-screen h-screen flex flex-col items-center">
            <Navbar />
            <div className="w-1/2 pt-6">
                {props.children}//components from all routes
            </div>
        </main>
    );
}

export default BaseLayout;