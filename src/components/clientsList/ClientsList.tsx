"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";

const ClientsList = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const {clients, getClients, deleteClient} = useClientStore();

    useEffect(() => {
        if (clients.length === 0) {
            getClients({page, limit});
        }
    }, []);

    const removeClient = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteClient(target.dataset.id);
    }

    return (
        <div>
            {clients.map(item => (
                <div key={item.email} className="px-6 py-2 mb-4 xl:w-1/2 flex justify-between border border-gray-300 rounded-sm" >
                    <div className="flex flex-col gap-3">
                        <h2>{item.name}</h2>
                        <div className="flex flex-col gap-1 text-base font-normal">
                            <div className="flex gap-5">
                                <h4>Email: {item.email}</h4>
                                <h4>Phone: {item.phone ? item.phone : "unknown"}</h4>
                            </div>
                            <div className="flex gap-5">
                                <h4>Creation date: {`
                                    ${new Date(item.createdAt).getDate()}.${new Date(item.createdAt).getMonth()}.${new Date(item.createdAt).getFullYear()}
                                `}</h4>
                                <h4>Last modified: {`
                                    ${new Date(item.updatedAt).getDate()}.${new Date(item.updatedAt).getMonth()}.${new Date(item.updatedAt).getFullYear()}
                                `}</h4>
                            </div>
                        </div>
                    </div>
                    <Button data-id={item.id} onClick={removeClient} className="self-end cursor-pointer">Delete</Button>
                </div>
            ))}
        </div>
    );
};

export  { ClientsList };