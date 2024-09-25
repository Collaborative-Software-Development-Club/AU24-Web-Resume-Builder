import {Input} from '@/components/ui/input';
import {useEffect} from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const FormSchema = z.object({
    username: z.string().max(30, {
        message: 'Your name can only be 30 characters or less',
    }),
});

export function Name({name}) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
        },
    });
    useEffect(() => {
        form.setValue('name', name);
    }, []);

    return (
        <Form {...form}>
            <form className="self-center">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <h1>
                                    <Input type="text" {...field} placeholder="Brutus Buckeye" className="times text-center text-2xl" />
                                </h1>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
