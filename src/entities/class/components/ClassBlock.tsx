import { FC } from 'react'
import { IClass } from '../models/Class'
import { subjectApi } from '@/shared/store/services/SubjectService'
import { teacherApi } from '@/shared/store/services/TeacherService'

type Props = {
    classData: IClass
}

const ClassBlock: FC<Props> = ({ classData }) => {
    const subject = subjectApi.useFetchSubjectByIdQuery(classData.subjectId).data;
    const teacher = teacherApi.useFetchTeacherByIdQuery(classData.teacherId).data;


    if(!subject || !teacher) {
        return <h1>No subject or teacher found</h1>
    }
    return (
        <div className='flex flex-col rounded-md shadow-md bg-card p-4'>
            <h2 className='text-xl font-semibold'>{`Предмет: ${subject.name}`}</h2>
            <h3 className='text-xl'>{`Преподователь: ${teacher.name}`}</h3>
        </div>
    )
}

export default ClassBlock