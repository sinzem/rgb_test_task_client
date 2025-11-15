import { create } from "zustand";
import axios from "axios";
import { Deal, DealCreateDto, DealFull, DealsGetDto, DealUpdateDto } from "@/types/deals";
import DealService from "../services/DealService";
import { useClientStore } from "./clientStore";


interface DealState {
    deal: DealFull | null;
    deals: Deal[];
    totalDeals: number;
    isWarn: string[] | null;
    isLoading: boolean;  

    setWarn: (value: string[] | null) => void;
    createDeal: ({title, amount, clientId}: DealCreateDto) => Promise<void>;
    updateDeal: (id: string, {title, amount, status}: DealUpdateDto) => Promise<void>;
    getDeals: ({page, limit, status, clientId}: DealsGetDto) => Promise<void>;
    deleteDeal: (id: string) => Promise<void>;
}

export const useDealStore = create<DealState>((set) => ({
    deal: null,
    deals: [],
    totalDeals: 0,
    isWarn: null,
    isLoading: false,

    setWarn: (value) => {set(() => ({isWarn: value}))},
    createDeal: async ({title, amount, clientId}) => {
        const {client, setClient} = useClientStore.getState();
        set(() => ({isLoading: true}));
        try {
            const response = await DealService.createDeal({title, amount, clientId});
            if (response && response.status === 201 && response.data.deal) {
                if (client) {
                    const newClient = {...client, deals: [...client.deals, response.data.deal]};
                    setClient(newClient)
                }
                set(() => ({isWarn: ["Deal created successfully"]}));
            }   
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later" ]}));
                console.error("Connection error when creating deal:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    updateDeal: async (id, {title, amount, status}) => {
        const {client, setClient} = useClientStore.getState();
        set(() => ({isLoading: true}));
        try {
            const response = await DealService.updateDeal(id, {title, amount, status});
            if (response && response.status === 200 && response.data.deal) {
                if (client) {
                    const deals = client.deals.filter(deal => deal.id !== id)
                    const newClient = {...client, deals: [...deals, response.data.deal]};
                    setClient(newClient)
                }
                // set((state) => ({ deals: [response.data.deal, ...state.deals] }));
                set((store) => ({deals: store.deals.map((deal) => deal.id === id ? response.data.deal : deal)}));
                set(() => ({isWarn: ["Deal updated successfully"]}));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later"] }));
                console.error("Connection error when updating deal:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    getDeals: async ({page, limit, status, clientId}: DealsGetDto) => {
        set(() => ({isLoading: true}));
        try {
            const response = await DealService.getDeals({page, limit, status, clientId});
            if (response && response.status === 200 && response.data.deals) {
                set(() => ({deals: response.data.deals}));
                set(() => ({totalDeals: response.data.total}));
            }  
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later" ]}));
                console.error("Connection error when getting deals:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    deleteDeal: async (id: string) => {
        set(() => ({isLoading: true}));
        try {
            const response = await DealService.deleteDeal(id);
            if (response && response.status === 200) {
                const {client, setClient} = useClientStore.getState();
                if (client) {
                    const newClient = {...client, deals: [...client.deals.filter(deal => deal.id !== id)]};
                    setClient(newClient)
                }
                set((store) => ({deals: [...store.deals.filter(deal => deal.id !== id)]}));
                set(() => ({isWarn: [response.data.message]}));
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later"] }));
                console.error("Connection error when deleting deal:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },
}))