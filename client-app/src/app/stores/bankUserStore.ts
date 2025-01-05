import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BankUser } from "../models/bankuser";
import { format } from 'date-fns';
import { Pagination, PagingParams } from "../models/pagination";


export default class BankUserStore {
    bankUserRegistry = new Map<string, BankUser>();
    selectedBankUser: BankUser | undefined = undefined;
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

    get bankUsersByDate() {
        return Array.from(this.bankUserRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedBankUsers() {
        return Object.entries(
            this.bankUsersByDate.reduce((bankusers, bankuser) => {
                const date = format(bankuser.date!, 'dd MMM yyyy');
                bankusers[date] = bankusers[date] ? [...bankusers[date], bankuser] : [bankuser];
                return bankusers;
            }, {} as { [key: string]: BankUser[] })
        )
    }

    loadBankUsers = async () => {
        this.loadingInitial = true;
        try {

            const result = await agent.BankUsers.list(this.axiosParams);
            result.data.forEach(bankuser => {
                this.setBankUser(bankuser);
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
    loadBankUser = async (id: string) => {
        let bankuser = this.getBankUser(id);
        if (bankuser) {
            this.selectedBankUser = bankuser;
            return bankuser;
        } else {
            this.loadingInitial = true;
            try {
                bankuser = await agent.BankUsers.details(id);
                this.setBankUser(bankuser);
                runInAction(() => {
                    this.selectedBankUser = bankuser;
                })
                this.setLoadingInitial(false);
                return bankuser;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setBankUser = (bankuser: BankUser) => {
        bankuser.date = new Date(bankuser.date!);
        this.bankUserRegistry.set(bankuser.id, bankuser);
    }

    private getBankUser = (id: string) => {
        return this.bankUserRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBankUser = async (bankuser: BankUser) => {
        this.loading = true;

        try {
            await agent.BankUsers.create(bankuser);
            runInAction(() => {
                this.bankUserRegistry.set(bankuser.id, bankuser);
                this.selectedBankUser = bankuser;
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
    updateBankUser = async (bankuser: BankUser) => {
        this.loading = true;
        try {
            await agent.BankUsers.update(bankuser);
            runInAction(() => {
                this.bankUserRegistry.set(bankuser.id, bankuser);
                this.selectedBankUser = bankuser;
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
    deleteBankUser = async (id: string) => {
        this.loading = true;
        try {
            await agent.BankUsers.delete(id);
            runInAction(() => {
                this.bankUserRegistry.delete(id);
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