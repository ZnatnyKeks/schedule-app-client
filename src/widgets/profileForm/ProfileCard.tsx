import { useToast } from "@/shared/components/ui/use-toast"
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks"
import { Button } from "@/shared/components/ui/button"
import { useState } from "react"
import ProfileImage from "./ProfileImage"

const ProfileCard = () => {
    const [isChanging, setIsChanging] = useState(false)
    const {toast} =  useToast()
    const {user, isLoading, error} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
  return (
    <div className="w-full flex justify-center items-center gap-4 flex-col sm:max-w-sm bg-card p-4 shadow-md rounded-xl">
        <ProfileImage/>
        <h1>{user.name}</h1>
        <Button onClick={() => setIsChanging(true)}>Изменить профиль</Button>
    </div>
  )
}

export default ProfileCard