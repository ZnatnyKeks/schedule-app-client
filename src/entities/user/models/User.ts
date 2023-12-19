import { UserRole } from "./UserRole"

export type IUser = {
    id: string,
    email: string,
    password: string,
    name: string,
    role: UserRole
}
export type ITeacher = {
    id: string,
    email: string,
    password: string,
    name: string,
    role: UserRole,
    classToTeachIds: string[],
    subjectToTeachIds: string[]
}
export type IStudent = {
    id: string,
    email: string,
    password: string,
    name: string,
    role: UserRole,
    groupId: number
}