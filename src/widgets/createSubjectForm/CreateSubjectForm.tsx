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
import { ISubject } from '@/entities/Subject'
import Loader from '@/shared/components/ui/loader'


const CreateSubjectForm = () => {
    const[isLoading, setIsLoading] = useState(false);
    const teacherResponse = teacherApi.useFetchAllTeacherQuery(100);
    const [createSubject] = subjectApi.useCreateSubjectMutation()
    useEffect(() => {
        setIsLoading(teacherResponse.isLoading)
    }, [ teacherResponse.isLoading]);
    const teachers  = teacherResponse.data;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            teacherId: "",
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        createSubject({name: values.name, teacherIds: [values.teacherId]} as ISubject)
    }
    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    if(!teachers) {
        return <h3>No teachers or subjects</h3>
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-sm bg-white flex flex-col gap-y-4 p-4 rounded-xl shadow-md pace-y-8 mx-4">
                <h1 className="text-xl font-bold tracking-tight">Создать предмет</h1>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input autoComplete="name" disabled={isLoading} {...field} />
                            </FormControl>
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
                <LoadingButton isLoading={isLoading}>Создать</LoadingButton>
            </form>
        </Form>
    )
}

export default CreateSubjectForm