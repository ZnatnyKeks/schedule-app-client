import { UserRole } from "./UserRole"

export type IUser = {
    id: string,
    email: string,
    password: string,
    name: string,
    info: string,
    age: number,
    imageUrl: string,
    role: UserRole
}