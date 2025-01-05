export interface Payment {
   id: string
   account: string
   amount: string
   date: Date | null;
   payee: string;
 }