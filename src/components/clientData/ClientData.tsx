"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { redirect, useParams } from "next/navigation";
import { MouseEvent, useEffect } from "react";
import { Button } from "../ui/button";

const ClientData = () => {
    const params = useParams();
    const id = params?.id;

    const {client, getClient, deleteClient} = useClientStore();

    useEffect(() => {
        if (id && typeof id === "string") getClient(id);
    }, [])

    if (!client) {
        return <div className="p-4 lg:w-1/2 flex flex-col gap-6 text-2xl border border-gray-300 rounded-xl">No Data...</div>
    }

    const removeClient = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteClient(target.dataset.id);
        redirect("/clients");
    }

    return (
        <div className="p-4 lg:w-1/2 flex flex-col lg:flex-row gap-6 justify-between border border-gray-300 rounded-xl font-bold">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl" >Name: {client.name}</h2>
                <h3 className="text-xl">Email: {client.email}</h3>
                <h3 className="text-xl">Phone: {client.phone ? client.phone : "unknown"}</h3>
            </div>
            <Button data-id={client.id} onClick={removeClient} className="self-end cursor-pointer">Delete</Button>
        </div>
    );
};

export default ClientData;