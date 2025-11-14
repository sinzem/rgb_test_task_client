import { create } from "zustand";
import axios from "axios";
import { Client, ClientCreateDto, ClientFull, ClientsGetDto, ClientUpdateDto } from "@/types/clients";
import ClientService from "../services/ClientService";


interface ClientState {
    client: ClientFull | null;
    clients: Client[];
    clientsTotal: number;
    isWarn: string[] | null;
    isLoading: boolean; 

    setWarn: (value: string[] | null) => void;  
    createClient: ({name, email, phone}: ClientCreateDto) => Promise<void>;
    updateClient: (id: string, {name, email, phone}: ClientUpdateDto) => Promise<void>;
    getClient: (id: string) => Promise<void>;
    getClients: ({page, limit}: ClientsGetDto) => Promise<void>;
    deleteClient: (id: string) => Promise<void>;
}

export const useClientStore = create<ClientState>((set) => ({
    client: null,
    clients: [],
    clientsTotal: 0,
    isWarn: null,
    isLoading: false,

    setWarn: (value) => {set(() => ({isWarn: value}))},   
    createClient: async ({name, email, phone}) => {
        set(() => ({isLoading: true}));
        try {
            const response = await ClientService.createClient({name, email, phone});
            if (response && response.status === 201 && response.data.client) {
                set((state) => ({ clients: [response.data.client, ...state.clients] }));
                set(() => ({isWarn: ["Client created successfully"]}));
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later"]}));
                console.error("Connection error when creating client:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    updateClient: async (id, {name, email, phone}) => {
        set(() => ({isLoading: true}));
        try {
            const response = await ClientService.updateClient(id, {name, email, phone});
            if (response && response.status === 200 && response.data.client) {
                set((state) => ({ clients: [response.data.client, ...state.clients] }));
                set(() => ({isWarn: ["Client updated successfully"]}));
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
                set(() => ({ isWarn: ["Connection error, try later"] }));
                console.error("Connection error when updating client:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    getClient: async (id: string) => {
        set(() => ({isLoading: true}));
        try {
            const response = await ClientService.getClient(id);
            if (response && response.status === 200 && response.data.client) {
                set(() => ({client: response.data.client}));
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later"] }));
                console.error("Connection error when getting client:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    getClients: async ({page, limit}: ClientsGetDto) => {
        set(() => ({isLoading: true}));
        try {
            const response = await ClientService.getClients({page, limit});
            if (response && response.status === 200 && response.data.clients) {
                set(() => ({clients: response.data.clients}));
                set(() => ({clientsTotal: response.data.total}))
            }  
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
              } else {
                set(() => ({ isWarn: ["Connection error, try later"] }));
                console.error("Connection error when getting clients:", error);
              }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },

    deleteClient: async (id: string) => {
        set(() => ({isLoading: true}));
        try {
            const response = await ClientService.deleteClient(id);
            if (response && response.status === 200) {
                set(() => ({isWarn: [response.data.message]}));
                set(() => ({client: null}));
                set((store) => ({clients: store.clients.filter((item) => item.id !== id)}))
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messages = Array.isArray(error.response?.data) ? error.response.data : [];
                set(() => ({ isWarn: [error.message, ...messages]}));
                throw error;
            } else {
            set(() => ({ isWarn: ["Connection error, try later"] }));
            console.error("Connection error when deleting client:", error);
            }
        } finally {
            set(() => ({isLoading: false})); 
        }
    },
}))