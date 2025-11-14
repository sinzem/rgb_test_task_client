import { Deal } from "./deals"

export type Client = {
    id: string,
    name: string,
    email: string,
    phone: string | null,
    createdAt: Date,
    updatedAt: Date,
}

export type ClientFull = Client & {
    deals: Deal[];
}

export type ClientCreateDto = {
    name: string;
    email: string;
    phone?: string;
}

export type ClientUpdateDto = {
    name?: string;
    email?: string;
    phone?: string;
}

export type ClientsGetDto = {
    page: number | null;
    limit: number | null;
}