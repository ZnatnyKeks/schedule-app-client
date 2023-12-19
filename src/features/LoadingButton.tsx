import { Button } from '@/shared/components/ui/button'
import { Loader } from 'lucide-react'
import { FC, ReactNode } from 'react'

type Props = {
    isLoading: boolean
    children: ReactNode
}

const LoadingButton: FC<Props> = ({ isLoading, children }) => {
    return (
        <Button disabled={isLoading} type="submit" >
            {isLoading ? <Loader /> : children}
        </Button>
    )
}

export default LoadingButton