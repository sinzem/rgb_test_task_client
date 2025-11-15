"use client";

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useDealStore } from "@/lib/store/dealStore";
import { Deal, DealStatus } from "@/types/deals";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function UpdateDealForm({activity, deal}: {activity: React.Dispatch<React.SetStateAction<boolean>>; deal: Deal}) {
    const {updateDeal, setWarn} = useDealStore();

    const formSchema = z.object({
        title: z.string().min(2,  {message: "Title must be at least 2 characters"}).max(32, {message: "Title must be no more than 32 characters"}).optional(),
        amount: z.string().min(1).optional(),
        status: z.enum(["NEW", "IN_PROGRESS", "WON", "LOST"]).optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: undefined,
            amount: undefined,
            status: undefined,
        },
    })
    
    function onSubmit({title, amount, status}: z.infer<typeof formSchema>) {
        if (!title && !amount && !status) {
            setWarn(["To update, please enter at least one value."]);
            return;
        }
        if (amount) {
            const checkAmount = isNaN(Number(amount));
            if (checkAmount || Number(amount) <= 0) {
                setWarn(["Must be a positive amount."]);
                return;
            }
        }
        updateDeal(deal.id, {title, amount: Number(amount), status: status as DealStatus});
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
                                    Must be between 2 and 32 letters long (optional).
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder={deal.title} {...field} />
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
                                    Must be a positive amount (optional).
                                </FormDescription>
                                <FormControl>
                                    <Input className="placeholder:text-gray-400 text-white/90" placeholder={String(deal.amount)} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/90">Deal status: </FormLabel>
                                <FormDescription className="text-white/70">
                                    Select one of the possible (optional).
                                </FormDescription>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || undefined}
                                        // value={field.value}
                                    >
                                        <SelectTrigger className="w-[180px] text-white/70">
                                            <SelectValue placeholder={deal.status} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="NEW">NEW</SelectItem>
                                            <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                            <SelectItem value="WON">WON</SelectItem>
                                            <SelectItem value="LOST">LOST</SelectItem>
                                        </SelectContent>
                                    </Select>      
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="mt-4 border border-white/70 cursor-pointer">Update deal</Button>
                </form>
            </Form>
        </div>
    )
}

    