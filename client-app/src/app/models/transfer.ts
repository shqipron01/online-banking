export interface Transfer {
    id: string;
    transferNumber: string;
    accountNumber: string;
    amount: string;
    payee: string;
    date: Date | null;
}