import { UserRole } from "./UserRole"

export type IUser = {
    id: string,
    email: string,
    password: string,
    name: string,
    imageUrl: string,
    role: UserRole
}