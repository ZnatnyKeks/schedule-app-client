import { IUser } from '@/entities/user'
import { FC } from 'react'

type Props = {
    user: IUser
}

const UserCard: FC<Props> = ({user}) => {
    return (
        <div className='p-4 rounded-xl shadow-md bg-rose-200 bg-opacity-50 max-w-sm'>
            <h1>{user.email}</h1>
        </div>
    )
}

export default UserCard