import { Outlet } from "react-router-dom";

import { Header } from "@/components/shared/header";

export function RootLayout() {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}
