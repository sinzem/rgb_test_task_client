import { type AxiosResponse } from "axios";

import { $api } from "../http";
import { Client, ClientCreateDto, ClientFull, ClientsGetDto, ClientUpdateDto } from "@/types/clients";

export default class ClientService {
    static createClient({name, email, phone}: ClientCreateDto): Promise<AxiosResponse<{client: Client}>>  {
        return $api.post<{client: Client}>(`/api/clients`, {name, email, phone});
    }

    static getClient(id: string): Promise<AxiosResponse<{client: ClientFull}>>  {
        return $api.get<{client: ClientFull}>(`/api/clients/${id}`);
    }

    static updateClient(id: string, {name, email, phone}: ClientUpdateDto): Promise<AxiosResponse<{client: ClientFull}>>  {
        return $api.patch<{client: ClientFull}>(`/api/clients/${id}`, {name, email, phone});
    }

    static async getClients({page, limit}: ClientsGetDto): Promise<AxiosResponse<{clients: Client[]}>> {
        let query = `/?`;
        if (page) query += `page=${page}&`;
        if (limit) query += `limit=${limit}&`; 

        return $api.get<{clients: Client[]}>(`/api/clients${query}`);
    }

    static deleteClient(id: string): Promise<AxiosResponse<{message: string}>>  {
        return $api.delete<{message: string}>(`/api/clients/${id}`);
    }
}
