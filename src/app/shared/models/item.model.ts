export interface Item {
    id: string;
    name: string;
    type: string;
    provider: string;
    availableDate: string;
    qty: number;
    location: string;
    creator: string;
};

export interface ActiveElements {
    name: string;
    type: string;
    location: string;
    qty: number;
}