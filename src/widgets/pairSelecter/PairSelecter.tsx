import { IUser } from "@/entities/user"
import UserCard from "@/features/UserCard"
import { Button } from "@/shared/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks"
import { nextPair } from "@/shared/store/reducers/ActionCreaters"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const PairSelecter = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()
    const [pair, setPair] = useState({} as IUser)
    useEffect(() => {
        dispatch(nextPair(user.id)).then((res) => setPair(res.payload))
    }, [dispatch, user.id])
    return (
        <div className="flex gap-x-4 items-center w-full sm:max-w-md">
            <Button variant={'ghost'}><ArrowLeft /></Button>
            <UserCard user={pair}/>
            <Button variant={'ghost'}><ArrowRight /></Button>
        </div>
    )
}

export default PairSelecter