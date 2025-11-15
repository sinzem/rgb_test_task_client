"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { redirect, useParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UpdateClientForm } from "./UpdateClientForm";

const ClientData = () => {
    const params = useParams();
    const id = params?.id;

    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const {client, getClient, deleteClient} = useClientStore();

    useEffect(() => {
        if (id && typeof id === "string") getClient(id);
    }, [])

    const updateClient = () => {
        setShowCreateForm(true);
    }

    if (!client) {
        return <div className="p-4 lg:w-1/2 flex flex-col gap-6 text-2xl border border-gray-300 rounded-xl">No Data...</div>
    }

    const removeClient = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteClient(target.dataset.id);
        redirect("/clients");
    }

    return (
        <div className="p-4 lg:w-1/2 flex flex-col lg:flex-row gap-6 justify-between border border-gray-300 rounded-xl font-bold relative">
            <div onClick={updateClient} className="flex flex-col gap-6 cursor-pointer">
                <h2 className="text-2xl" >Name: {client.name}</h2>
                <h3 className="text-xl">Email: {client.email}</h3>
                <h3 className="text-xl">Phone: {client.phone ? client.phone : "unknown"}</h3>
            </div>
            <Button data-id={client.id} onClick={removeClient} className="self-end cursor-pointer">Delete</Button>
            {showCreateForm && 
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center z-10">
                    <UpdateClientForm activity={setShowCreateForm} client={client} />
                </div>
            }
        </div>
    );
};

export default ClientData;