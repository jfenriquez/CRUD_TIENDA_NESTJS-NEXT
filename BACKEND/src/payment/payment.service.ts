import { Inject, Injectable } from '@nestjs/common';

import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentService {
  private readonly mercadoPago: MercadoPagoConfig;
  constructor() /* @Inject('MERCADO_PAGO_ACCESS_TOKEN')
    private readonly access_token: string,
    @Inject('MERCADO_PAGO_PUBLIC_KEY')
    private readonly public_key: string, */
  {
    //this.mercadoPago = new MercadoPagoConfig(access_token, public_key);
  }
}
