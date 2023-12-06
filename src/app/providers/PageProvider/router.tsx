import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "@/pages/home/HomePage";
import AuthPage from "@/pages/auth/AuthPage";
import MainLayout from "./MainLayout";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/auth",
                element: <AuthPage />
            },
            {
                element: <MainLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    },
                ]
            }
        ]
    }
])

export default router;