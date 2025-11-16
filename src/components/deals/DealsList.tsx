"use client";

import { useDealStore } from "@/lib/store/dealStore";
import DealCard from "./DealCard";
import { useEffect, useState } from "react";
import LimitChanger from "../ui/limitChanger";
import Pagination from "../ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DealStatusSelect } from "@/types/deals";


const DealsList = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [status, setStatus] = useState<DealStatusSelect>("ALL");
    const {deals, totalDeals, getDeals} = useDealStore();

    useEffect(() => {
        getDeals({});
    }, [])

    const changePage = (direction: string) => {
        if (direction === "prev" && page - 1 > 0) {
            setPage(prev => prev - 1);
            getDeals({page: page - 1, limit, status: status === "ALL" ? undefined : status});
        }
        if (direction === "next" && Math.ceil(totalDeals / limit) > page) {
            setPage(prev => prev + 1);
            getDeals({page: page + 1, limit, status: status === "ALL" ? undefined : status});
        }
    }

    const changeSelect = (value: DealStatusSelect) => {
        setPage(1);
        setStatus(value);
        getDeals({page: 1, limit, status: value === "ALL" ? undefined : value});
    }
    
    return (
        <div className="mb-4 flex-col w-[100%] lg:w-[50%] flex gap-5">

            <div className="mb-4 flex-col sm:flex-row w-[100%] flex gap-5">
                <LimitChanger limit={limit} setLimit={setLimit}/>
            </div>

            <Select onValueChange={(value) => changeSelect(value as DealStatusSelect)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select deal status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">ALL</SelectItem>
                    <SelectItem value="NEW">NEW</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="WON">WON</SelectItem>
                    <SelectItem value="LOST">LOST</SelectItem>
                </SelectContent>
            </Select>

            <Pagination page={page} limit={limit} total={totalDeals} changePage={changePage} />

            {!deals || !deals.length &&
                <div className="text-xl font-bold">No Data...</div>
            }
            {deals.length 
                ? ([...deals].reverse().map(deal => (
                    <DealCard key={deal.id} deal={deal} direction="dealsList"/>
                )))
                : null
            }
        </div>
    );
};

export default DealsList;