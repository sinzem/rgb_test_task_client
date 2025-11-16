"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { redirect, useParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UpdateClientForm } from "./UpdateClientForm";
import { Client } from "@/types/clients";
import { getTime } from "@/lib/utils/getTime";

const ClientCard = ({
    size,
    clientData = undefined
}: {
    size: "big" | "small";
    clientData?: Client;
}) => {
    const params = useParams();
    const id = params?.id;

    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const {client, getClient, deleteClient} = useClientStore();

    useEffect(() => {
        if (id && typeof id === "string" && size === "big") getClient(id);
    }, [])

    const data = size === "big" ? client : clientData;

    if (!data) {
        return <div className="p-4 lg:w-1/2 flex flex-col gap-6 text-2xl border border-gray-300 rounded-xl">No Data...</div>
    }

    const removeClient = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteClient(target.dataset.id);
        redirect("/clients");
    }

    const clickAction = () => {
        if (size === "big") {
            setShowCreateForm(true);
        } else {
            redirect(`/clients/${data.id}`);
        } 
    }
    
    return (
        <div className="px-6 py-2 mb-4 lg:w-1/2 flex flex-col sm:flex-row gap-2 justify-between border border-gray-300 rounded-sm" >
            <div className="flex flex-col gap-3">
                <h2 className={`${size === "big" ? "text-2xl" : "text-xl"} font-bold`}>{data.name}</h2>
                <div className="flex flex-col gap-2 text-base font-normal">
                    <div className="flex flex-col gap-1">
                        <h4>Email: <span className={size === "big" ? "font-bold" : "font-normal"}>
                                {data.email}
                            </span></h4>
                        <h4>Phone: <span className={size === "big" ? "font-bold" : "font-normal"}>
                                {data.phone ? data.phone : "unknown"}
                            </span>
                        </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4>Creation date: <span className={size === "big" ? "font-bold" : "font-normal"}>
                                {`${getTime(data.createdAt)}`}
                            </span>
                        </h4>
                        <h4>Last modified: <span className={size === "big" ? "font-bold" : "font-normal"}>
                                {`${getTime(data.updatedAt)}`}
                            </span>
                        </h4>
                    </div>  
                </div>
            </div>
            <div className="flex sm:flex-col gap-2 justify-end">
                <Button data-id={data.id} onClick={clickAction} className="min-w-24 self-end cursor-pointer">
                    {size === "big" ? "Update" : "Details"}
                </Button>
                <Button data-id={data.id} onClick={removeClient} className="min-w-24 self-end cursor-pointer">Delete</Button>
            </div>
            
            {size === "big" && showCreateForm && 
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center z-10">
                    <UpdateClientForm activity={setShowCreateForm} client={data} />
                </div>
            }
        </div>
    );
};

export default ClientCard;