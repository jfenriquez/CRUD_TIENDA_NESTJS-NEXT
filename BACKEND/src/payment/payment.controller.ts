import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoConfig, PaymentMethod, Preference } from 'mercadopago';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { PaymentRequestDto } from './payment.dto';
import { ConfigService } from '@nestjs/config';

@Controller('payment')
export class PaymentController {
  constructor(private readonly configService: ConfigService) {
    console.log('PaymentController');
  }

  /* WEBHOOK */
  @Post('mercado-libre')
  async handleMercadoLibreWebhook(@Body() body: any) {
    //console.log('handleMercadoLibreWebhook');
    //console.log(req);
    //return { body };
    //return this.webhooksService.processWebhook(body, headers, req);
  }
  @Post()
  async getPayment(@Body() paymentDto: PaymentRequestDto) {
    ///CONFIG
    const client = new MercadoPagoConfig({
      accessToken: this.configService.get<string>(
        'config.Mercadopago.MERCADOPAGO_API_KEY',
      ),
    });

    try {
      const body = {
        items: [
          {
            title: paymentDto.title,
            description: paymentDto.description,
            quantity: Number(paymentDto.quantity),
            currency_id: paymentDto.currency_id,
            unit_price: Number(paymentDto.unit_price),
          },
        ],
        back_urls: {
          success: 'https://www.notion.so/',
          failure:
            'https://www.youtube.com/watch?v=XoBJQOgdqdQ&ab_channel=TechyWebDev',
          pending:
            'https://youtu.be/-VD-l5BQsuE?list=PLizlJ35EN043aLQbFUf6jWHR9eqQ4Zkmp',
        },
        auto_return: 'approved',
        payment_methods: {
          installments: 1, // Force one-time payment (1 installment)
        },
      };
      const preference = new Preference(client);

      //const paymentMethod = new PaymentMethod(client);
      //const paymentMethods = await paymentMethod.get();
      //console.log('xxxxxxxxxxxxxxxxxxxxxx', paymentMethods);

      const result = await preference.create({
        body: body as PreferenceRequest,
      });

      //console.log(result);
      return { id: result.id };

      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
