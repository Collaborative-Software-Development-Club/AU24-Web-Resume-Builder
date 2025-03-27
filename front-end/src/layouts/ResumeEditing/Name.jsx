import {Input} from '@/components/ui/input';
import {useEffect} from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {EditOnClick} from '../../components/EditOnClick';

const FormSchema = z.object({
    username: z.string().max(30, {
        message: 'Your name can only be 30 characters or less',
    }),
});

export function Name({name, updateName}) {
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
        <EditOnClick
            empty={!name}
            editingView={
                <Form {...form}>
                    <form className="self-center">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <h1>
                                            <Input
                                                type="text"
                                                {...field}
                                                placeholder="Brutus Buckeye"
                                                className="times text-center text-2xl"
                                                onChange={(e) => {
                                                    form.setValue('name', e.target.value);
                                                    updateName(e.target.value);
                                                }}
                                            />
                                        </h1>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            }
            displayView={
                <h1 className="times shadow-smpx-3 h-9 rounded-md border py-1 text-center text-2xl">
                    {name}
                </h1>
            }
        />
    );
}
