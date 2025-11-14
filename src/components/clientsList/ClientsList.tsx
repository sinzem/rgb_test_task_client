"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AddClientForm } from "./AddClientForm";

const ClientsList = () => {
    const [page, setPage] = useState<number>(3);
    const [limit, setLimit] = useState<number>(10);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const {clients, clientsTotal, getClients, deleteClient} = useClientStore();

    useEffect(() => {
        if (clients.length === 0) {
            getClients({page, limit});
        }
    }, []);

    const addClient = () => {
        setShowCreateForm(true);
        setPage(1);
        getClients({page, limit});
    }

    const removeClient = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteClient(target.dataset.id);
    }

    const changePage = (direction: string) => {
        if (direction === "prev" && page - 1 > 0) {
            setPage(prev => prev - 1);
            getClients({page: page - 1, limit});
        }
        if (direction === "next" && Math.ceil(clientsTotal / limit) > page) {
            setPage(prev => prev + 1);
            getClients({page: page + 1, limit});
        }
    }

    return (
        <div className="relative">
            <div className="mb-4 flex-col sm:flex-row w-[100%] flex gap-5">
                <Button onClick={addClient} className="w-fit cursor-pointer">Add client</Button>
                <div className="flex gap-3 items-center">
                    Quantity per page: {limit}
                    <div>
                        <Button 
                            disabled={limit < 50 ? false : true} onClick={() => {setLimit(prev => prev + 1); setPage(1)}}
                            className="font-bold text-xl w-9"
                        >
                            +
                        </Button>
                        <Button 
                            disabled={limit > 1 ? false : true} onClick={() => {setLimit(prev => prev - 1); setPage(1)}}
                            className="font-bold text-xl w-9"
                        >
                            -
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 items-center mb-4">
                <div
                    onClick={() => changePage("prev")}  
                    className={`${page - 1 < 1 ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} py-1 px-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg select-none`}
                >
                    Prev
                </div>
                    {page}
                <div
                    onClick={() => changePage("next")}  
                    className={`${(Math.floor(clientsTotal / limit) < page) ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} py-1 px-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg select-none`}
                >
                    Next
                </div>
            </div>
                   
            {!clients.length &&
                <h2>No Clients data...</h2> 
            }

            {clients.map(item => (
                <div key={item.email} className="px-6 py-2 mb-4 lg:w-1/2 flex justify-between border border-gray-300 rounded-sm" >
                    <div className="flex flex-col gap-3">
                        <h2>{item.name}</h2>
                        <div className="flex flex-col gap-1 text-base font-normal">
                            <div className="flex flex-col sm:flex-row sm:gap-5">
                                <h4>Email: {item.email}</h4>
                                <h4>Phone: {item.phone ? item.phone : "unknown"}</h4>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-5">
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

            {showCreateForm &&
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center">
                    <AddClientForm activity={setShowCreateForm} />
                </div>
            }
        </div>
    );
};

export  { ClientsList };