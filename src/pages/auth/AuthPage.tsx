import { useState } from "react"
import { Action } from "./action"
import AuthForm from "../../widgets/authForm/AuthForm";

const AuthPage = () => {
    const [action, setAction] = useState<Action>(Action.LOGIN);
    return (
        <div className="w-full h-full min-h-screen flex gap-y-4 justify-center items-center flex-col">
            <h1>{action === Action.REGISTRATION ? "Create new account" : "Log in to your account"}</h1>
            <AuthForm action={action} setAction={setAction} />
        </div>
    )
}

export default AuthPage