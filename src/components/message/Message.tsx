"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { useDealStore } from "@/lib/store/dealStore";
import { useEffect, useId } from "react";

const Message = () => {
    const {isWarn: clientWarn, setWarn: setClientWarn} = useClientStore();
    const {isWarn: dealWarn, setWarn: setDealWarn} = useDealStore();

    useEffect(() => {
        if (clientWarn) {
            const timeout = setTimeout(() => setClientWarn(null), 3000);

            return () => clearTimeout(timeout);
        }
    }, [clientWarn])

    useEffect(() => {
        if (dealWarn) {
            const timeout = setTimeout(() => setDealWarn(null), 3000);

            return () => clearTimeout(timeout);
        }
    }, [dealWarn])

    if (!dealWarn && !clientWarn) return;

    return (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-5 items-center justify-center">
            {clientWarn && 
                <div className="p-8 h-fit bg-gray-200 text-xl font-bold border border-gray-500 rounded-sm">
                    {clientWarn.map(mes => (
                        <h2 key={mes}>{mes}</h2>
                    ))}
                </div>
            } 
            {dealWarn && 
                <div className="p-8 h-fit bg-gray-200 text-xl font-bold border border-gray-500 rounded-sm">
                    {dealWarn.map(mes => (
                        <h2 key={mes}>{mes}</h2>
                    ))}
                </div>
            } 
        </div>
    )
}

export { Message };

