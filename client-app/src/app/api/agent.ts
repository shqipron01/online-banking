import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify";
import { history } from "../..";
import { Account } from "../models/account";
import { Balance } from "../models/balance";
import { BankUser } from "../models/bankuser";
import { Branch } from "../models/branch";
import { Cards } from "../models/card";
import { Contact } from "../models/contact";
import { Customer } from "../models/customer";
import { Deposit } from "../models/deposit";
import { Interest } from "../models/interest";
import { Loan } from "../models/loan";
import { PaginatedResult } from "../models/pagination";
import { Payment } from "../models/payment";
import { Profile } from "../models/profile";
import { Salary } from "../models/salary";
import { Transaction } from "../models/transaction";
import { Transfer } from "../models/transfer";
import { User, UserFormValues } from "../models/user";
import { Withdraw } from "../models/withdraw";
import { store } from "../stores/store";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const {data, status, config}: any = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Accounts = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Account[]>>('/accounts', {params}).then(responseBody),
    details: (id: string) => requests.get<Account>(`/accounts/${id}`),
    create: (account: Account) => requests.post<void>('/accounts', account),
    update: (account: Account) => requests.put<void>(`/accounts/${account.id}`, account),
    delete: (id: string) => requests.del<void>(`/accounts/${id}`)

}
const Balances = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Balance[]>>('/balances', {params}).then(responseBody),
    details: (id: string) => requests.get<Balance>(`/balances/${id}`),
    create: (balance: Balance) => requests.post<void>('/balances', balance),
    update: (balance: Balance) => requests.put<void>(`/balances/${balance.id}`, balance),
    delete: (id: string) => requests.del<void>(`/balances/${id}`)
}
const BankUsers={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<BankUser[]>>('/bankuser',{params}).then(responseBody),
    details:(id:string) => requests.get<BankUser>(`/bankuser/${id}`),
    create: (bankuser:BankUser) => axios.post<void>('/bankuser',bankuser),
    update: (bankuser:BankUser) => axios.put<void>(`/bankuser/${bankuser.id}`,bankuser),
    delete: (id:string) => axios.delete<void>(`/bankuser/${id}`)
}
const Branches={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Branch[]>>('/branches',{params}).then(responseBody),
    details:(id:string) => requests.get<Branch>(`/branches/${id}`),
    create: (branch:Branch) => axios.post<void>('/branches',branch),
    update: (branch:Branch) => axios.put<void>(`/branches/${branch.id}`,branch),
    delete: (id:string) => axios.delete<void>(`/branches/${id}`)
}
const Card = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Cards[]>>('/cards', {params}).then(responseBody),
    details: (id: string) => requests.get<Cards>(`/cards/${id}`),
    create: (card: Cards) => requests.post<void>('/cards', card),
    update: (card: Cards) => requests.put<void>(`/cards/${card.id}`, card),
    delete: (id: string) => requests.del<void>(`/cards/${id}`)
}
const Contacts={

    list : (params: URLSearchParams) => axios.get<PaginatedResult<Contact[]>>('/contact',{params}).then(responseBody),
    details:(id:string) => requests.get<Contact>(`/contact/${id}`),
    create: (contact:Contact) => axios.post<void>('/contact',contact),
    update: (contact:Contact) => axios.put<void>(`/contact/${contact.id}`,contact),
    delete: (id:string) => axios.delete<void>(`/contact/${id}`)

}
const Customers={

    list : (params: URLSearchParams) => axios.get<PaginatedResult<Customer[]>>('/customer',{params}).then(responseBody),
    details:(id:string) => requests.get<Customer>(`/customer/${id}`),
    create: (customer:Customer) => axios.post<void>('/customer',customer),
    update: (customer:Customer) => axios.put<void>(`/customer/${customer.id}`,customer),
    delete: (id:string) => axios.delete<void>(`/customer/${id}`)
}
const Deposits={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Deposit[]>>('/deposit',{params}).then(responseBody),
    details:(id:string) => requests.get<Deposit>(`/deposit/${id}`),
    create: (deposit:Deposit) => axios.post<void>('/deposit',deposit),
    update: (deposit:Deposit) => axios.put<void>(`/deposit/${deposit.id}`,deposit),
    delete: (id:string) => axios.delete<void>(`/deposit/${id}`)
}
const Interests={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Interest[]>>('/interest',{params}).then(responseBody),
    details:(id:string) => requests.get<Interest>(`/interest/${id}`),
    create: (interest:Interest) => axios.post<void>('/interest',interest),
    update: (interest:Interest) => axios.put<void>(`/interest/${interest.id}`,interest),
    delete: (id:string) => axios.delete<void>(`/interest/${id}`)
}
const Loans={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Loan[]>>('/loan',{params}).then(responseBody),
    details:(id:string) => requests.get<Loan>(`/loan/${id}`),
    create: (loan:Loan) => axios.post<void>('/loan',loan),
    update: (loan:Loan) => axios.put<void>(`/loan/${loan.id}`,loan),
    delete: (id:string) => axios.delete<void>(`/loan/${id}`)
}

const Payments={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Payment[]>>('/payment',{params}).then(responseBody),
    details:(id:string) => requests.get<Payment>(`/payment/${id}`),
    create: (payment:Payment) => axios.post<void>('/payment',payment),
    update: (payment:Payment) => axios.put<void>(`/payment/${payment.id}`,payment),
    delete: (id:string) => axios.delete<void>(`/payment/${id}`)
}
const Salarys={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Salary[]>>('/salary',{params}).then(responseBody),
    details:(id:string) => requests.get<Salary>(`/salary/${id}`),
    create: (salary:Salary) => axios.post<void>('/salary',salary),
    update: (salary:Salary) => axios.put<void>(`/salary/${salary.id}`,salary),
    delete: (id:string) => axios.delete<void>(`/salary/${id}`)
}
const Transactions={
    list : (params: URLSearchParams) => axios.get<PaginatedResult<Transaction[]>>('/transaction',{params}).then(responseBody),
    details:(id:string) => requests.get<Transaction>(`/transaction/${id}`),
    create: (transaction:Transaction) => axios.post<void>('/transaction',transaction),
    update: (transaction:Transaction) => axios.put<void>(`/transaction/${transaction.id}`,transaction),
    delete: (id:string) => axios.delete<void>(`/transaction/${id}`)
}
const Transfers = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Transfer[]>>('/transfers', {params}).then(responseBody),
    details: (id: string) => requests.get<Transfer>(`/transfers/${id}`),
    create: (transfer: Transfer) => requests.post<void>('/transfers', transfer),
    update: (transfer: Transfer) => requests.put<void>(`/transfers/${transfer.id}`, transfer),
    delete: (id: string) => requests.del<void>(`/transfers/${id}`)
}
const Withdraws = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Withdraw[]>>('/withdraws', {params}).then(responseBody),
    details: (id: string) => requests.get<Withdraw>(`/withdraws/${id}`),
    create: (withdraw: Withdraw) => requests.post<void>('/withdraws', withdraw),
    update: (withdraw: Withdraw) => requests.put<void>(`/withdraws/${withdraw.id}`, withdraw),
    delete: (id: string) => requests.del<void>(`/withdraws/${id}`)
}

const UserAccount = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile)
}

const agent = {
    Accounts,
    Balances,
    BankUsers,
    Branches,
    Card,
    Contacts,
    Customers,
    Deposits,
    Interests,
    Loans,
    Payments,
    Salarys,
    Transactions,
    Transfers,
    Withdraws,
    UserAccount,
    Profiles
}

export  default agent;