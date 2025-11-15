import { type AxiosResponse } from "axios";

import { $api } from "../http";
import { Deal, DealCreateDto, DealFull, DealsGetDto, DealUpdateDto } from "@/types/deals";

export default class DealService {
    static createDeal({title, amount, clientId}: DealCreateDto): Promise<AxiosResponse<{deal: Deal}>>  {
        return $api.post<{deal: Deal}>(`/api/deals`, {title, amount, clientId});
    }

    static getDeal(id: string): Promise<AxiosResponse<{deal: DealFull}>>  {
        return $api.get<{deal: DealFull}>(`/api/deals/${id}`);
    }

    static updateDeal(id: string, {title, amount, status}: DealUpdateDto): Promise<AxiosResponse<{deal: DealFull}>>  {
        return $api.patch<{deal: DealFull}>(`/api/deals/${id}`, {title, amount, status});
    }

    static async getDeals({page, limit, status, clientId}: DealsGetDto): Promise<AxiosResponse<{deals: Deal[], total: number}>> {
        let query = `/?`;
        if (page) query += `page=${page}&`;
        if (limit) query += `limit=${limit}&`; 
        if (status) query += `status=${status}&`; 
        if (clientId) query += `limit=${clientId}&`; 

        return $api.get<{deals: Deal[], total: number}>(`/api/deals${query}`);
    }

    static deleteDeal(id: string): Promise<AxiosResponse<{message: string}>>  {
        return $api.delete<{message: string}>(`/api/deals/${id}`);
    }
}