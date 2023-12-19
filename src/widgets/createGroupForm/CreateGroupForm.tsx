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
import { useEffect, useState } from 'react'
import { studentApi } from '@/shared/store/services/StudentService'
import { groupApi } from '@/shared/store/services/GroupService'
import { IGroup } from '@/entities/Group'
import Loader from '@/shared/components/ui/loader'


const CreateGroupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const studentsResponse = studentApi.useFetchAllStudentsQuery(100);
    const [createGroup] = groupApi.useCreateGroupMutation()
    useEffect(() => {
        setIsLoading(studentsResponse.isLoading)
    }, [studentsResponse.isLoading]);
    const students = studentsResponse.data;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: 1,
            studentIds: [],
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        createGroup({
            number: values.number,
            studentIds: values.studentIds
        } as IGroup)
    }
    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    if (!students) {
        return <h3>No students found</h3>
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-sm bg-white flex flex-col gap-y-4 p-4 rounded-xl shadow-md pace-y-8 mx-4">
                <h1 className="text-xl font-bold tracking-tight">Создать группу</h1>
                <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Номер</FormLabel>
                            <FormControl>
                                <Input autoComplete="number" type='number' disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="studentIds"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Студенты</FormLabel>
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
                                                ? students.filter(student => student.id === field.value.find(id => id === student.id)).map(studend => studend.name).join(', ')
                                                : "Выберите студента"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput disabled={isLoading} placeholder="Найти студента..." />
                                        <CommandEmpty>Студент не найден</CommandEmpty>
                                        <CommandGroup>
                                            {students.map((student) => (
                                                <CommandItem
                                                    value={student.name}
                                                    key={student.id}
                                                    onSelect={() => {
                                                        form.setValue("studentIds", field.value.find(id => id === student.id) ? field.value.filter(id => id !== student.id) : [...field.value, student.id])
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value.find((id) => id === student.id)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )} />
                                                    {student.name}
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

export default CreateGroupForm