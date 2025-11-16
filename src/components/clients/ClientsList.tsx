"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AddClientForm } from "./AddClientForm";
import LimitChanger from "../ui/limitChanger";
import Pagination from "../ui/pagination";
import ClientCard from "./ClientCard";

const ClientsList = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const {clients, clientsTotal, getClients} = useClientStore();

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
                <LimitChanger limit={limit} setLimit={setLimit}/>
            </div>

            <Pagination page={page} limit={limit} total={clientsTotal} changePage={changePage} />
                   
            {!clients.length &&
                <h2>No Clients data...</h2> 
            }

            {clients.map(item => (
                <ClientCard key={item.id} size="small" clientData={item}/>
            ))}

            {showCreateForm &&
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center z-10">
                    <AddClientForm activity={setShowCreateForm} />
                </div>
            }
        </div>
    );
};

export  { ClientsList };