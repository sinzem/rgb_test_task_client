"use client";

import { useDealStore } from "@/lib/store/dealStore";
import DealCard from "./DealCard";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";


const DealsList = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const {deals, totalDeals, getDeals} = useDealStore();

    useEffect(() => {
        getDeals({});
    }, [])

    const changePage = (direction: string) => {
        if (direction === "prev" && page - 1 > 0) {
            setPage(prev => prev - 1);
            getDeals({page: page - 1, limit});
        }
        if (direction === "next" && Math.ceil(totalDeals / limit) > page) {
            setPage(prev => prev + 1);
            getDeals({page: page + 1, limit});
        }
    }

    return (
        <div className="mb-4 flex-col w-[100%] lg:w-[50%] flex gap-5">

            <div className="mb-4 flex-col sm:flex-row w-[100%] flex gap-5">
                <div className="flex gap-3 items-center">
                    Quantity per page: {limit}
                    <div>
                        <Button 
                            disabled={limit < 50 ? false : true} onClick={() => setLimit(prev => prev + 1)}
                            className="font-bold text-xl w-9"
                        >
                            +
                        </Button>
                        <Button 
                            disabled={limit > 1 ? false : true} onClick={() => setLimit(prev => prev - 1)}
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
                    className={`${(Math.floor(totalDeals / limit) < page) ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} py-1 px-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg select-none`}
                >
                    Next
                </div>
            </div>

            {!deals || !deals.length &&
                <div className="text-xl font-bold">No Data...</div>
            }
            {deals.length 
                ? ([...deals].reverse().map(deal => (
                    <DealCard key={deal.id} deal={deal}/>
                )))
                : null
            }
        </div>
    );
};

export default DealsList;