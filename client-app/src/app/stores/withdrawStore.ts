import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Withdraw } from "../models/withdraw";
import {format} from 'date-fns';
import { Pagination, PagingParams } from "../models/pagination";


export default class WithdrawStore {
    withdrawRegistry = new Map<string, Withdraw>();
    selectedWithdraw: Withdraw | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor(){
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

    get withdrawsByDate() {
        return Array.from(this.withdrawRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupeWithdraws() {
        return Object.entries(
            this.withdrawsByDate.reduce((withdraws, withdraw) => {
                const date = format(withdraw.date!, 'dd MMM yyyy');
                withdraws[date] = withdraws[date] ? [...withdraws[date], withdraw] : [withdraw];
                return withdraws;
            }, {} as {[key: string]: Withdraw[]})
        )
    }

    loadWithdraws = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Withdraws.list(this.axiosParams);
            result.data.forEach(withdraw =>{
                this.setWithdraw(withdraw);
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

    loadWithdraw = async (id: string) => {
        let withdraw = this.getWithdraw(id);
        if (withdraw) {
            this.selectedWithdraw = withdraw;
            return withdraw;
        } else {
            this.loadingInitial = true;
            try {
                withdraw = await agent.Withdraws.details(id);
                this.setWithdraw(withdraw);
                runInAction(() => {
                    this.selectedWithdraw = withdraw;
                })
                this.setLoadingInitial(false);
                return withdraw;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setWithdraw = (withdraw: Withdraw) => {
        withdraw.date = new Date(withdraw.date!);
        this.withdrawRegistry.set(withdraw.id, withdraw);
    }

    private getWithdraw = (id: string) => {
        return this.withdrawRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createWithdraw = async (withdraw: Withdraw) => {
        this.loading = true;
        try {
            await agent.Withdraws.create(withdraw);
            runInAction(() => {
                this.withdrawRegistry.set(withdraw.id, withdraw);
                this.selectedWithdraw = withdraw;
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

    updateWithdraw = async (withdraw: Withdraw) => {
        this.loading = true;
        try {
            await agent.Withdraws.update(withdraw);
            runInAction(() => {
                this.withdrawRegistry.set(withdraw.id, withdraw);
                this.selectedWithdraw = withdraw;
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

    deleteWithdraw = async (id: string) => {
        this.loading = true;
        try {
            await agent.Withdraws.delete(id);
            runInAction(() => {
                this.withdrawRegistry.delete(id);
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
