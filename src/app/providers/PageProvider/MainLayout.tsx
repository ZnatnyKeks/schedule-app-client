import { Outlet } from "react-router";
import Header from "./Header";
import { Toaster } from "@/shared/components/ui/toaster";

export default function MainLayout() {
    return (
        <>
            <Toaster />
            <Header />
            <main className="h-full min-h-screen pt-16">
                <Outlet />
            </main>
        </>
    )
}