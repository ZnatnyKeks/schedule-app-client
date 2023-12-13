import { User2Icon } from 'lucide-react'
import { FC } from 'react'

type Props = {
    imageUrl?: string
}

const ProfileImage: FC<Props> = ({ imageUrl }) => {
    if (!imageUrl) {
        return (
            <User2Icon className='rounded-md w-full h-full text-accent'/>
        )
    }
    return (
        <img src={imageUrl} alt='image'/>
    )
}

export default ProfileImage