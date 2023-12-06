import { UserRole } from "..";

export function getRole(role: UserRole) {
    switch (role) {
        case UserRole.ADMIN:
            return "Админ";
        case UserRole.USER:
            return "Пользователь";
        default:
            return "Неизвестная роль";
    }
}
