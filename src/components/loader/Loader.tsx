"use client";

import { useClientStore } from "@/lib/store/clientStore";
import { useDealStore } from "@/lib/store/dealStore";

const Loader = () => {
    const {isLoading: clientLoading} = useClientStore();
    const {isLoading: dealLoading} = useDealStore();

    if (!clientLoading && !dealLoading) return;

    return (
        <div className="fixed bottom-10 left-10 z-20">
            <img src="./loader.gif" alt="loader"/>
        </div>
    );
};

export default Loader;