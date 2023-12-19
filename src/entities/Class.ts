import { Weekday } from "./class/types/weekday"

export type IClass = {
    id: string,
    weekday: Weekday,
    hour: number,
    minute: number,
    subjectId: string,
    teacherId: string,
    groupIds: string[]
}