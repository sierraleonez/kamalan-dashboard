export interface EventCategory {
    id: string;
    name: string;
    description: string;
    background_image: string;
    icon: string;
}

export interface Registry {
    event_id: number;
    date: string;
    formatted_date: string;
    id: number;
    magic_link: string;
    name: string;
    user_id: number;
}

export interface Product {
    id: number;
    name: string;
    event_id: number;
    affiliate_link: string;
    display_image: string;
    enable: boolean;
    formatted_price: string;
    categories?: Array<{id: number; name: string}>;
}

export interface GiftCart {
    id: number;
    product_id: number;
    quantity: number;
    registry_id: number;
}

export interface DeliveryInfo {
    id: number;
    registry_id: number;
    photo_url: string;
    greeting: string;
    receiver_name: string;
    phone_number: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    postal_code: string;
    address: string;
    notes: string;
}

export type ShareRegistryResponse = Registry & {
    event: EventCategory;
    products: Array<Product & { pivot: GiftCart }>;
    delivery_info: DeliveryInfo
};
