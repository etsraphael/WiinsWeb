export class CardPayment {
  constructor(
      public name: string,
      public description: string,
      public pricing_type: string,
      public local_price: { amount: string, currency: string },
      public metadata: { userID: string, price: number }
  ) { }
}