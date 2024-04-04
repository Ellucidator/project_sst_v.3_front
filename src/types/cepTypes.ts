export interface CepResponse {
    name: string;
    price: string;
    delivery_range: {
        min: number;
        max: number;
    };
    company: {
        id: number;
        name: string;
        picture: string;
    };
}