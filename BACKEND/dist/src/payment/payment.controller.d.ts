import { PaymentRequestDto } from './payment.dto';
import { ConfigService } from '@nestjs/config';
export declare class PaymentController {
    private readonly configService;
    constructor(configService: ConfigService);
    handleMercadoLibreWebhook(body: any): Promise<void>;
    getPayment(paymentDto: PaymentRequestDto): Promise<{
        id: string;
    }>;
}
