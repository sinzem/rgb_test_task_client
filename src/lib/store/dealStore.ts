import { create } from "zustand";
import axios from "axios";
import { Deal, DealCreateDto, DealFull, DealsGetDto, DealUpdateDto } from "@/types/deals";
import DealService from "../services/DealService";


interface DealState {
    deal: DealFull | null;
    deals: Deal[];
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
    isWarn: null,
    isLoading: false,

    setWarn: (value) => {set(() => ({isWarn: value}))},
    createDeal: async ({title, amount, clientId}) => {
        set(() => ({isLoading: true}));
        try {
            const response = await DealService.createDeal({title, amount, clientId});
            if (response && response.status === 201 && response.data.deal) {
                set((state) => ({deals: [response.data.deal, ...state.deals]}));
                set(() => ({isWarn: ["Deal created successfully"]}));
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore       
                // eslint-disable-next-line no-unused-vars 
                set(() => ({ isWarn: [...response.response.data.message] }));
            }  
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set(() => ({ isWarn: [...error.response?.data.message] }));
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
        set(() => ({isLoading: true}));
        try {
            const response = await DealService.updateDeal(id, {title, amount, status});
            if (response && response.status === 200 && response.data.deal) {
                set((state) => ({ deals: [response.data.deal, ...state.deals] }));
                set(() => ({isWarn: ["Deal updated successfully"]}));
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore       
                // eslint-disable-next-line no-unused-vars        
                set(() => ({ isError: [...response.response.data.message ]}));
            }  
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set(() => ({ isWarn: [...error.response?.data.message] }));
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
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore       
                // eslint-disable-next-line no-unused-vars       
                set(() => ({ isWarn: [...response.response.data.message] }));
            }  
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set(() => ({ isWarn: [...error.response?.data.message] }));
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
                set(() => ({isWarn: [...response.data.message]}));
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore       
                // eslint-disable-next-line no-unused-vars       
                set(() => ({ isWarn: [...response.response.data.message] }));
            }  
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set(() => ({ isWarn: [...error.response?.data.message ]}));
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