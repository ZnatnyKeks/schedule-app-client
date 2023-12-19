import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { classApi } from "./services/ClassService";
import { teacherApi } from "./services/TeacherService";
import { subjectApi } from "./services/SubjectService";
import { studentApi } from "./services/StudentService";
import { groupApi } from "./services/GroupService";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(classApi.middleware, teacherApi.middleware, subjectApi.middleware, studentApi.middleware, groupApi.middleware)
})


export default store;