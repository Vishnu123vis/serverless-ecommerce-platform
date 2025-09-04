type ItemId = string;
export type itemGroup = 'phone' | 'computer' | 'accessories'
type Type = string
type Brand = string

export interface ItemsRecord {
    id: ItemId,
    pk: itemGroup,
    sk: `${Type}#${Brand}#${ItemId}`;

    title: string;
    company: string;
    description: string;
    storage: string;
    colorPrefrence?: {
        colorCode: number;
        displayValue: string;
    } [];

}

export type OrderStatus = 'placed' | 'packed' | 'delivered' | 'error'

export interface OrderRecord {
    id: string;
    pk: string;
    sk: `order#${number}`;

    userId: string;
    userEmail: string;
    dateCreated: number;
    dateUpdated?: number;
    status: OrderStatus;
    items: {id: ItemId; count: number; color?: string}[]
}