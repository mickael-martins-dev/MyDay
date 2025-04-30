import React from "react";
import { Outlet } from "react-router-dom";

import BaseLayout from "../pages/layout/BaseLayout";

// component
const DefaultRoute = () => {

    return (
        <BaseLayout  >
            <Outlet />
        </BaseLayout>
    );
};

export default DefaultRoute;