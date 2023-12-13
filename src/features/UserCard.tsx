import { IUser } from '@/entities/user'
import React, { FC } from 'react'

type Props = {
    user: IUser
}

const UserCard:FC<Props> = ({user}) => {
  return (
    <div className='shadow-md rounded-xl bg-card p-4 w-full sm:max-w-md min-h-8'>
        <h1>The next one is:</h1>
        <img src={user.imageUrl} alt="user avatar"/>
        <h2>{user.name}</h2>
        <h3>{user.age} лет</h3>
    </div>
  )
}

export default UserCard