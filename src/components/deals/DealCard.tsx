import { Deal } from "@/types/deals";
import { Button } from "../ui/button";
import { useDealStore } from "@/lib/store/dealStore";
import { MouseEvent, useState } from "react";
import { UpdateDealForm } from "./UpdateDealForm";

const DealCard = ({deal}: {deal: Deal}) => {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const {deleteDeal} = useDealStore();

    const removeDeal = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e?.target as HTMLButtonElement | null;
        if (target && target.dataset && target.dataset.id) deleteDeal(target.dataset.id);
    }

    const updateDeal = () => {
        setShowCreateForm(true);
    }
    
    return (
        <div className="w-full p-3 border border-gray-3000 rounded-lg">
            <div className="flex item-center justify-between">
                <h2 onClick={updateDeal} className="text-lg font-bold cursor-pointer">{deal.title}</h2>
                <Button data-id={deal.id} onClick={removeDeal} className="cursor-pointer">Delete</Button>
            </div>
            <div onClick={updateDeal} className="grid grid-rows-[1fr_1fr] gap-1 text-base font-normal cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:gap-5">
                    <h4>Amount: {deal.amount}</h4>
                    <h4>Status: {deal.status}</h4>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-5">
                    <h4>Creation date: {`
                        ${new Date(deal.createdAt).getDate()}.${new Date(deal.createdAt).getMonth()}.${new Date(deal.createdAt).getFullYear()}
                    `}</h4>
                    <h4>Last modified: {`
                        ${new Date(deal.updatedAt).getDate()}.${new Date(deal.updatedAt).getMonth()}.${new Date(deal.updatedAt).getFullYear()}
                    `}</h4>
                </div>
            </div>
             {showCreateForm &&
                <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex items-center justify-center z-10">
                    <UpdateDealForm activity={setShowCreateForm} deal={deal} />
                </div>
            }
        </div>
    );
};

export default DealCard;