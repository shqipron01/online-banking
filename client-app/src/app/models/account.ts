export interface Account {
    id: string;
    name: string;
    surname: string;
    accountNumber: string;
    accountType: string;
    openDate: Date | null;
    balance: string;
}