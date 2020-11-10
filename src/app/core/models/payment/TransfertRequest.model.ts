export class TransfertRequest {
  id: string
  amount: number
  currency: string
  address: string
  password: string

  constructor(password: string, amount: number, currency: string, address: string){
    this.password = password
    this.amount = amount
    this.currency = currency
    this.address = address
  }
}