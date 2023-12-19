import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/shared/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Check, ChevronsUpDown, } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/shared/components/ui/command'
import { formSchema } from "./formSchema"
import LoadingButton from "@/features/LoadingButton"
import { subjectApi } from '@/shared/store/services/SubjectService'
import { teacherApi } from '@/shared/store/services/TeacherService'
import { useEffect, useState } from 'react'
import { Weekday } from '@/entities/class/models/Weekday'
import { getWeekday } from '@/entities/class/helpers/getWeekday'
import { classApi } from '@/shared/store/services/ClassService'
import { IClass } from '@/entities/class/models/Class'
import Loader from '@/shared/components/ui/loader'
import { groupApi } from '@/shared/store/services/GroupService'


const CreateClassForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const subjectResponse = subjectApi.useFetchAllSubjectsQuery(100);
    const teacherResponse = teacherApi.useFetchAllTeacherQuery(100);
    const groupResponse = groupApi.useFetchAllGroupsQuery(100);
    const [createClass] = classApi.useCreateClassMutation();
    useEffect(() => {
        setIsLoading(subjectResponse.isLoading || teacherResponse.isLoading)
    }, [subjectResponse.isLoading, teacherResponse.isLoading]);
    const subjects = subjectResponse.data;
    const teachers = teacherResponse.data;
    const groups = groupResponse.data;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            weekday: Weekday.MONDAY,
            hour: 8,
            minute: 0,
            subjectId: "",
            teacherId: "",
            groupIds: []
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        createClass({ ...values } as IClass)
    }
    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    if (!subjects || !teachers || !groups) {
        return <h3>No teachers or subjects or groups</h3>
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-sm bg-white flex flex-col gap-y-4 p-4 rounded-xl shadow-md pace-y-8 mx-4">
                <h1 className="text-xl font-bold tracking-tight">Создать пару</h1>
                <FormField
                    control={form.control}
                    name="weekday"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>День недели</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-auto justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? getWeekday(Object.values(Weekday).find((weekday) => weekday === field.value) || Weekday.MONDAY)
                                                : "Выберите день недели"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput disabled={isLoading} placeholder="Найти день недели..." />
                                        <CommandEmpty>День недели не найден</CommandEmpty>
                                        <CommandGroup>
                                            {Object.values(Weekday).map((weekday) => (
                                                <CommandItem
                                                    value={weekday}
                                                    key={weekday}
                                                    onSelect={() => {
                                                        form.setValue("weekday", weekday)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            weekday === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )} />
                                                    {getWeekday(weekday)}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hour"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Час</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} type="number" placeholder="8" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="minute"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Минута</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Предмет</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-auto justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? subjects.find((subject) => subject.id === field.value)?.name ?? "Выберите преподователя"
                                                : "Выберите предмет"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput disabled={isLoading} placeholder="Найти предмет..." />
                                        <CommandEmpty>Предмет не найден</CommandEmpty>
                                        <CommandGroup>
                                            {subjects.map((subject) => (
                                                <CommandItem
                                                    value={subject.name}
                                                    key={subject.id}
                                                    onSelect={() => {
                                                        form.setValue("subjectId", subject.id)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            subject.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )} />
                                                    {subject.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="teacherId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Преподователь</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-auto justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? teachers.find((teacher) => teacher.id === field.value)?.name ?? "Выберите преподователя"
                                                : "Выберите преподователя"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput disabled={isLoading} placeholder="Найти преподователя..." />
                                        <CommandEmpty>Преподователь не найден</CommandEmpty>
                                        <CommandGroup>
                                            {teachers.map((teacher) => (
                                                <CommandItem
                                                    value={teacher.name}
                                                    key={teacher.id}
                                                    onSelect={() => {
                                                        form.setValue("teacherId", teacher.id)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            teacher.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )} />
                                                    {teacher.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="groupIds"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Группы</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-auto justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? groups.filter(group => group.id === field.value.find(id => id === group.id)).map(group => group.number).join(', ')
                                                : "Выберите группу"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput disabled={isLoading} placeholder="Найти группу..." />
                                        <CommandEmpty>Группа не найден</CommandEmpty>
                                        <CommandGroup>
                                            {groups.map((group) => (
                                                <CommandItem
                                                    value={`Группа ${group.number}`}
                                                    key={group.id}
                                                    onSelect={() => {
                                                        form.setValue("groupIds", field.value.find(id => id === group.id) ? field.value.filter(id => id !== group.id) : [...field.value, group.id])
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value.find((id) => id === group.id)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )} />
                                                    {group.number}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton isLoading={isLoading}>Создать</LoadingButton>
            </form>
        </Form>
    )
}

export default CreateClassForm