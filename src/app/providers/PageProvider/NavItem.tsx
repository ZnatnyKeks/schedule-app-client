import  { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
    to: string
    children: ReactNode
}

const NavItem:FC<Props> = ({to, children}) => {
  return (
    <NavLink to={to}>{children}</NavLink>
  )
}

export default NavItem