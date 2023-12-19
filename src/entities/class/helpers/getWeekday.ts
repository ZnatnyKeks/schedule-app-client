import { Weekday } from "../models/Weekday";

export function getWeekday(weekday: Weekday) {
    switch (weekday) {
        case Weekday.MONDAY:
            return "Понедельник";
        case Weekday.TUESDAY:
            return "Вторник";
        case Weekday.WEDNESDAY:
            return "Среда";
        case Weekday.THURSDAY:
            return "Четверг";
        case Weekday.FRIDAY:
            return "Пятница";
        case Weekday.SATURDAY:
            return "Суббота";
        case Weekday.SUNDAY:
            return "Воскресенье";
        default:
            return "Неизвестная роль";
    }
}
