import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "@/pages/home/HomePage";
import AuthPage from "@/pages/auth/AuthPage";
import MainLayout from "./MainLayout";
import ProfilePage from "@/pages/profile/ProfilePage";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/auth",
                element: <AuthPage />
            },
            {
                element: <RootLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    },
                    {
                        path: "/profile",
                        element: <ProfilePage />
                    },
                ]
            }
        ]
    }
])

export default router;