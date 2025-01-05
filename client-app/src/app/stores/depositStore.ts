import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Deposit } from "../models/deposit";
import { Pagination, PagingParams } from "../models/pagination";
import {format} from 'date-fns';

export default class DepositStore{
    depositRegistry = new Map<string, Deposit>();
    selectedDeposit: Deposit | undefined = undefined;
    editMode=false;
    loading = false;

    loadingInitial=false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    constructor(){
        makeAutoObservable(this)
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    get axiosParams() {
        const params= new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    }

    get depositByDate() {
        return Array.from(this.depositRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedDeposit() {
        return Object.entries(
            this.depositByDate.reduce((deposits,deposit) => {
                const date = format(deposit.date!, 'dd MMM yyyy');
                deposits[date] = deposits[date] ? [...deposits[date], deposit] : [deposit];
                return deposits;
            }, {} as {[key: string]: Deposit[]})
        )
    }
    loadDeposits = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Deposits.list(this.axiosParams);
            result.data.forEach(deposit => {
                this.setDeposit(deposit);
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
    loadDeposit = async (id:string) =>{
        let deposit = this.getDeposit(id);
        if(deposit){
            this.selectedDeposit = deposit;

            return deposit;
        }else{
            this.loadingInitial=true;
            try {

               deposit = await agent.Deposits.details(id);
                this.setDeposit(deposit);
                runInAction(() =>{
                    this.selectedDeposit = deposit;

                })
                this.setLoadingInitial(false);
                return deposit;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setDeposit =(deposit : Deposit) =>{
        deposit.date = new Date(deposit.date!);
        this.depositRegistry.set(deposit.id,deposit);
    }

    private getDeposit = (id:string) =>{
        return this.depositRegistry.get(id);
    }

    setLoadingInitial =(state:boolean) =>{
        this.loadingInitial = state;
    }

   createDeposit = async (deposit : Deposit) => {

       this.loading=true;
  
    try {
        await agent.Deposits.create(deposit);
        runInAction(() =>{
            this.depositRegistry.set(deposit.id,deposit);
            this.selectedDeposit = deposit;
            this.editMode=false;
            this.loading=false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() =>{
         
            this.loading=false;
        })
        }
   }
   updateDeposit = async (deposit : Deposit) =>{
       this.loading=true;
       try {
        await agent.Deposits.update(deposit);
        runInAction(() =>{
            this.depositRegistry.set(deposit.id,deposit);
            this.selectedDeposit = deposit;
            this.editMode=false;
            this.loading=false;
        })
       } catch (error) {
           console.log(error);
           runInAction(() =>{
            this.loading=false;
        })
       }
   }

   deleteDeposit = async (id : string) =>{

    this.loading=true;
    try {
     await agent.Deposits.delete(id);
     runInAction(() =>{
         this.depositRegistry.delete(id);
         this.loading=false;
     })
    } catch (error) {
        console.log(error);
        runInAction(() =>{
         this.loading=false;
     })
    }
}
}