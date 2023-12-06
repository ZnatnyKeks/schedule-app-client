import { Button } from "@/shared/components/ui/button";
import Loader from "@/shared/components/ui/loader";
import { Toaster } from "@/shared/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { getAuthFromStorage, removeUserErrors } from "@/shared/store/reducers/authActionCreaters";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function RootLayout() {
    const { isLoading, error } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAuthFromStorage())
    }, [dispatch])

    const removeUserError = () => {
        dispatch(removeUserErrors())
    }
    if (isLoading) {
        return (
            <>
                <Toaster />
                <Loader />
            </>
        )
    }
    if (error) {
        return (
            <>
                <Toaster />
                <div className="flex justify-center items-center h-full min-h-screen">
                    <Link to={'/auth'}><Button onClick={removeUserError}>Войти в аккаунт</Button></Link>
                </div>
            </>
        )
    }
    return (
        <>
            <Toaster />
            <Outlet />
        </>
    )
}