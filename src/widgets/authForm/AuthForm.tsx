import { FC, useEffect } from 'react'
import { Action } from '../../pages/auth/action'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/shared/components/ui/use-toast'
import * as z from 'zod'
import { UserRole, getRole } from '@/entities/user'
import { Input } from '@/shared/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Check, ChevronsUpDown, } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/shared/components/ui/command'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { login, register } from '@/shared/store/reducers/ActionCreaters'
import { AuthRequest } from '@/entities/auth/models/AuthRequest'
import { RegisterRequest } from '@/entities/auth/models/RegisterRequest'
import { formSchema } from './formSchema'
import Loader from '@/shared/components/ui/loader'
import { Navigate } from 'react-router-dom'
type Props = {
    action: Action,
    setAction: (action: Action) => void
}

const AuthForm: FC<Props> = ({ action, setAction }) => {
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const { user, isLoading, error } = useAppSelector(state => state.userReducer)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            name: '',
            role: UserRole.STUDENT,
        }
    })
    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Ошибка",
                description: error,
                duration: 2500
            })
        }
    }, [error, toast])

    if (user.email) {
        return <Navigate to={'/'} />
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const { email, password, name, role } = values;
        if (action === Action.LOGIN) {
            const req: AuthRequest = {
                email,
                password
            }
            dispatch(login(req));
        } else if (name && role) {
            const req: RegisterRequest = { email, password, name, role }
            dispatch(register(req));
        }
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-sm bg-white flex flex-col gap-y-4 p-4 rounded-xl shadow-md pace-y-8 mx-4">
                <h1 className="text-xl font-bold tracking-tight">
                    {action === Action.LOGIN
                        ? 'Войти в аккаунт'
                        : 'Создание аккаунта'}
                </h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input autoComplete="username" disabled={isLoading} placeholder="jhon@mail.ru" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input autoComplete="current-password" disabled={isLoading} type="password" placeholder="secured.Password123"{...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {action === Action.REGISTRATION &&

                    <>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="name" disabled={isLoading} placeholder="Иван"{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Тип аккаунта</FormLabel>
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
                                                        ? getRole(Object.values(UserRole).find((role) => role === field.value) || UserRole.STUDENT)
                                                        : "Выберите тип аккаунта"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput disabled={isLoading} placeholder="Найти тип..." />
                                                <CommandEmpty>Тип не найден</CommandEmpty>
                                                <CommandGroup>
                                                    {Object.values(UserRole).map((role) => (
                                                        <CommandItem
                                                            value={role}
                                                            key={role}
                                                            onSelect={() => {
                                                                form.setValue("role", role)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    role === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )} />
                                                            {getRole(role)}
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
                    </>
                }
                <div className="text-sm font-lighter text-gray-600">
                    {action === Action.LOGIN
                        ? <div>Впервые у нас?<Button disabled={isLoading} type="button" variant={"link"} onClick={() => setAction(Action.REGISTRATION)}>Создать аккаунт</Button></div>
                        : <div>Уже есть аккаунт?<Button disabled={isLoading} type="button" variant={"link"} onClick={() => setAction(Action.LOGIN)}>Войти в аккаунт</Button></div>
                    }
                </div>
                <Button disabled={isLoading} type="submit" >
                    {isLoading ? <Loader /> :
                        action === Action.LOGIN
                            ? 'Войти'
                            : 'Зарегестрироваться'}
                </Button>
            </form>
        </Form>
    )
}

export default AuthForm