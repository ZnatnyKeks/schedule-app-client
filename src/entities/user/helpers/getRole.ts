import { UserRole } from "..";

export function getRole(role: UserRole) {
    switch (role) {
        case UserRole.ADMIN:
            return "Админ";
        case UserRole.TEACHER:
            return "Преподователь";
        case UserRole.STUDENT:
            return "Студент";
        default:
            return "Неизвестная роль";
    }
}
