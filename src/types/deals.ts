import { Client } from "./clients"

export type Deal = {
    id: string,
    title: string,
    amount: number,
    status: DealStatus,
    createdAt: Date,
    updatedAt: Date, 
}

export type DealFull = Deal & {
    client: Client;
}

export enum DealStatus {
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
    WON = "WON",
    LOST = "LOST"
}

export type DealCreateDto = {
    title: string;
    amount: number;
    clientId: string;
}

export type DealUpdateDto = {
    title?: string;
    amount?: number;
    status?: DealStatus;
}

export type DealsGetDto = {
    page?: number;
    limit?: number;
    status?: DealStatus;
    clientId?: string;
}