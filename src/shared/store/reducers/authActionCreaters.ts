import { IUser } from "@/entities/user"
import { AppDispatch } from "../types"
import { userSlice } from "./UserSlice"

export const getAuthFromStorage = () => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.gettingAuth())
        const json = localStorage.getItem('user')
        
        if (json != null) {
            const user: IUser = JSON.parse(json)
            dispatch(userSlice.actions.gettingAuthSuccess(user))
        }else {
            dispatch(userSlice.actions.gettingAuthError("Не авторизован"))
        }

    } catch (error) {
        dispatch(userSlice.actions.gettingAuthError("Не авторизован"))

    }
}
export const removeUserErrors  = () => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.removeError())

    } catch (error) {
        dispatch(userSlice.actions.gettingAuthError("Ошибка"))

    }
}