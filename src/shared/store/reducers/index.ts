import { combineReducers } from "redux";
import userReducer from './UserSlice';
import { classApi } from "../services/ClassService";
import { teacherApi } from "../services/TeacherService";
import { subjectApi } from "../services/SubjectService";
import { studentApi } from "../services/StudentService";
import { groupApi } from "../services/GroupService";


export const rootReducer = combineReducers({
    userReducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer
})
