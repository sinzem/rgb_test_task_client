"use client";

import { Deal, DealFull } from "@/types/deals";
import { Button } from "../ui/button";
import { useDealStore } from "@/lib/store/dealStore";
import { MouseEvent, useEffect, useState } from "react";
import { UpdateDealForm } from "./UpdateDealForm";
import { getTime } from "@/lib/utils/getTime";
import { redirect, useParams } from "next/navigation";

const DealCard = ({deal, direction}: {deal?: Deal; direction: "clientCard" | "dealsList" | "dealPage"}) => {
    const params = useParams();
    const id = params?.id;

    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const {deal: dealFull, getDeal, deleteDeal} = useDealStore();

    useEffect(() => {
        if (direction === "dealPage" && id && typeof id === "string") {
            getDeal(id);
        }
    }, [])

    let data: DealFull | Deal | undefined | null;
    if (direction === "dealPage") data = dealFull; 
    if (direction === "clientCard" ||  direction === "dealsList") data = deal; 

    if (!data) {
        return <div className="p-4 lg:w-1/2 flex flex-col gap-6 text-2xl border border-gray-300 rounded-xl">No Data...</div>
    }

    const removeDeal = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteDeal(target.dataset.id);
    }

    const clickAction = () => {
        if (direction === "clientCard" || direction === "dealPage") {
            setShowCreateForm(true);
        } else {
            redirect(`/deals/${data.id}`);
        } 
    }

    const toClientPage = () => {
        if (direction === "dealPage" && data && "client" in data) {
            redirect(`/clients/${data.client.id}`)
        }
    }
    
    return (
        <div className="w-full p-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border border-gray-3000 rounded-lg">
            <div className="flex flex-col gap-2 text-base font-normal">
                <h2 className={`${direction === "dealPage" ? "text-2xl" : "text-lg"} font-bold cursor-pointer`}>{data.title}</h2>
                {direction === "dealPage" && data && "client" in data &&
                    <h2 className={`${direction === "dealPage" ? "text-2xl" : "text-lg"} font-bold cursor-pointer`}><span className="font-normal">Client:</span>  {data.client.name}</h2>
                }
                <div className="flex flex-col sm:flex-row sm:gap-5">
                    <h4>Amount: {data.amount}</h4>
                    <h4>Status: {data.status}</h4>
                </div>
                <div className="flex flex-col gap-1">
                    <h4>Creation date: {getTime(data.createdAt)}</h4>
                    <h4>Last modified: {getTime(data.updatedAt)}</h4>
                </div>
            </div>
            <div className="flex sm:flex-col gap-2 item-center justify-end">
                {direction === "dealPage" &&
                    <Button data-id={data.id} onClick={toClientPage} className="min-w-24 cursor-pointer">All client deals</Button>
                }
                <Button data-id={data.id} onClick={clickAction} className="min-w-24 cursor-pointer">
                    {direction === "dealsList" ? "Details" : "Update"}
                </Button>
                <Button data-id={data.id} onClick={removeDeal} className="min-w-24 cursor-pointer">Delete</Button>
            </div>
             {showCreateForm &&
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center z-10">
                    <UpdateDealForm activity={setShowCreateForm} deal={data} />
                </div>
            }
        </div>
    );
};

export default DealCard;