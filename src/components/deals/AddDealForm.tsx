"use client";

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useDealStore } from "@/lib/store/dealStore";

export function AddDealForm({activity, clientId}: {activity: React.Dispatch<React.SetStateAction<boolean>>; clientId: string}) {
    const {createDeal, setWarn} = useDealStore();

    const formSchema = z.object({
        title: z.string().min(2,  {message: "Title must be at least 2 characters"}).max(32, {message: "Title must be no more than 32 characters"}),
        amount: z.string().min(1),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            amount: "",
        },
    })
    
    function onSubmit({title, amount}: z.infer<typeof formSchema>) {
        const checkAmount = isNaN(Number(amount));
        if (checkAmount || Number(amount) <= 0) {
            setWarn(["Must be a positive amount."]);
            return;
        }
        createDeal({title, amount: Number(amount), clientId});
        activity(false);
    }
    

    return (
        <div className="max-w-[300px] w-[90vw] relative border border-white/90 rounded-lg z-10">
            <Button onClick={() => activity(false)} className="absolute top-2 right-2 border bprder-white/80 cursor-pointer">X</Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 pt-8 flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/90">Deal title: </FormLabel>
                                <FormDescription className="text-white/70">
                                    Must be between 2 and 32 letters long.
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder="Buying TV" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/90">Deal amount: </FormLabel>
                                <FormDescription className="text-white/70">
                                    Must be a positive amount.
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder="1234.56" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="mt-4 border border-white/70 cursor-pointer">Create deal</Button>
                </form>
            </Form>
         
        </div>
    )
}

    