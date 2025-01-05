export interface Withdraw {
    id: string;
    accountNumber: string;
    amount: string;
    date: Date | null;
    pin: string;
}