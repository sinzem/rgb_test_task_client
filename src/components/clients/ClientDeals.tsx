"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { Button } from "../ui/button";
import { useState } from "react";
import { AddDealForm } from "../deals/AddDealForm";
import DealCard from "../deals/DealCard";

const ClientDeals = () => {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const {client} = useClientStore();

    if (!client) return; 

     const addDeal = () => {
        setShowCreateForm(true);
    }
   
    return (
        <div className="p-4 lg:w-1/2 relative flex flex-col gap-4 border border-gray-300 rounded-xl">
            <Button onClick={addDeal} className="min-w-24 mr-2 ml-auto cursor-pointer">Add deal</Button>
            {!client.deals.length && 
                <h2 className="ml-2 text-2xl">The client does not have any deals yet...</h2>
            }

            {[...client.deals].reverse().map(deal => (
                <DealCard key={deal.id} deal={deal} direction="clientCard" />
            ))}
               
            {showCreateForm && 
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center z-10">
                    <AddDealForm activity={setShowCreateForm} clientId={client.id} />
                </div>
            }
        </div>
    );
};

export default ClientDeals;