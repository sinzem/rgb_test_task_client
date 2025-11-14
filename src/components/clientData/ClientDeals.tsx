"use client";

import { useClientStore } from "@/lib/store/clientStore";

const ClientDeals = () => {

    const {client} = useClientStore();

    if (!client) return; 

    return (
        <div className="p-4 lg:w-1/2 flex flex-col gap-6 border border-gray-300 rounded-xl">
            {!client.deals.length && 
                <h2 className="text-2xl">The client does not have any deals yet...</h2>
            }
            {/* <h2 className="text-2xl" >Name: {client.name}</h2>
            <h3>Email: {client.email}</h3>
            <h3>Phone: {client.phone ? client.phone : "unknown"}</h3> */}
        </div>
    );
};

export default ClientDeals;