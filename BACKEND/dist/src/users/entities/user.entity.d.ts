import { Order } from './order.entity';
export declare class User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    phone: string;
    password: string;
    recovery_token: string;
    rol: string;
    get fullName(): string;
    createAt: Date;
    orders: Order[];
}
