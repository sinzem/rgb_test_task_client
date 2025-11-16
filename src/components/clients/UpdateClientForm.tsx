"use client";

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Client } from "@/types/clients";
import { useClientStore } from "@/lib/store/clientStore";


export function UpdateClientForm({activity, client}: {activity: React.Dispatch<React.SetStateAction<boolean>>; client: Client}) {
    const {updateClient, setWarn} = useClientStore();

    const formSchema = z.object({
        name: z.string().min(2,  {message: "Name must be at least 2 characters"}).max(20, {message: "The name must be no more than 20 characters"}).optional(),
        email: z.email().optional(),
        phone: z.string().optional().refine((val) => !val || val.length === 13, "The number must be in the format +380000000000"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
            email: undefined,
            phone: undefined,
        },
    })
    
    function onSubmit({name, email, phone}: z.infer<typeof formSchema>) {
        if (!name && !email && !phone) {
            setWarn(["To update, please enter at least one value."]);
            return;
        }
    
        updateClient(client.id, {name, email, phone});
        activity(false);
    }
    
    return (
        <div className="max-w-[300px] w-[90vw] relative border border-white/90 rounded-lg z-10">
            <Button onClick={() => activity(false)} className="absolute top-2 right-2 border bprder-white/80 cursor-pointer">X</Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 pt-8 flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/90">Client name: </FormLabel>
                                <FormDescription className="text-white/70">
                                    Must be between 2 and 20 letters long (optional).
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder={client.name} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/90">Email address: </FormLabel>
                                <FormDescription className="text-white/70">
                                    Must be a valid, unique email address (optional).
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder={String(client.email)} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                   <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/90">Phone number: </FormLabel>
                                <FormDescription className="text-white/70">
                                    Phone number (optional).
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder={client.phone ? client.phone : "unknown"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="mt-4 border border-white/70 cursor-pointer">Update client</Button>
                </form>
            </Form>
        </div>
    )
}

    