import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Transaction } from "../models/transaction";
import { format } from 'date-fns';

export default class TransactionStore {
    transactionRegistry = new Map<string, Transaction>();
    selectedTransaction: Transaction | undefined = undefined;
    editMode = false;
    loading = false;

    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    constructor() {
        makeAutoObservable(this)
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    }

    get transactionByDate() {
        return Array.from(this.transactionRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedTransaction() {
        return Object.entries(
            this.transactionByDate.reduce((transactions, transaction) => {
                const date = format(transaction.date!, 'dd MMM yyyy');
                transactions[date] = transactions[date] ? [...transactions[date], transaction] : [transaction];
                return transactions;
            }, {} as { [key: string]: Transaction[] })
        )
    }

    loadTransactions = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Transactions.list(this.axiosParams);
            result.data.forEach(transaction => {
                this.setTransaction(transaction);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    loadTransaction = async (id: string) => {
        let transaction = this.getTransaction(id);
        if (transaction) {
            this.selectedTransaction = transaction;

            return transaction;
        } else {
            this.loadingInitial = true;
            try {

                transaction = await agent.Transactions.details(id);
                this.setTransaction(transaction);
                runInAction(() => {
                    this.selectedTransaction = transaction;

                })
                this.setLoadingInitial(false);
                return transaction;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setTransaction = (transaction: Transaction) => {
        transaction.date = new Date(transaction.date!);
        this.transactionRegistry.set(transaction.id, transaction);
    }

    private getTransaction = (id: string) => {
        return this.transactionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTransaction = async (transaction: Transaction) => {

        this.loading = true;

        try {
            await agent.Transactions.create(transaction);
            runInAction(() => {
                this.transactionRegistry.set(transaction.id, transaction);
                this.selectedTransaction = transaction;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {

                this.loading = false;
            })
        }
    }
    updateTransaction = async (transaction: Transaction) => {
        this.loading = true;
        try {
            await agent.Transactions.update(transaction);
            runInAction(() => {
                this.transactionRegistry.set(transaction.id, transaction);
                this.selectedTransaction = transaction;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteTransaction = async (id: string) => {

        this.loading = true;
        try {
            await agent.Transactions.delete(id);
            runInAction(() => {
                this.transactionRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}