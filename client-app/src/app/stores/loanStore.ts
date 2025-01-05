import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Pagination, PagingParams } from "../models/pagination";
import { Loan } from "../models/loan";


export default class LoanStore {
    loanRegistry = new Map<string, Loan>();
    selectedLoan: Loan | undefined = undefined;
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

    get loansByDate() {
        return Array.from(this.loanRegistry.values()).sort((a, b) => a.loanDate!.getTime() - b.loanDate!.getTime());
    }

    get groupedLoans() {
        return Object.entries(
            this.loansByDate.reduce((loans,loan) => {
                const date = format(loan.loanDate!, 'dd MMM yyyy');
                loans[date] = loans[date] ? [...loans[date], loan] : [loan];
                return loans;
            }, {} as {[key: string]: Loan[]})
        )
    }

    loadLoans = async () =>  {
        this.loadingInitial = true;
        try {
            const result = await agent.Loans.list(this.axiosParams);
            result.data.forEach(loan =>{
                this.setLoan(loan);
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

    loadLoan = async (id: string) => {
        let loan = this.getLoan(id);
        if (loan) {
            this.selectedLoan = loan;
            return loan;
        } else {
            this.loadingInitial = true;
            try {
                loan = await agent.Loans.details(id);
                this.setLoan(loan);
                runInAction(() => {
                    this.selectedLoan =loan;
                })
                this.setLoadingInitial(false);
                return loan;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setLoan = (loan: Loan) => {
        loan.loanDate = new Date(loan.loanDate!);
        this.loanRegistry.set(loan.id, loan);
    }

    private getLoan = (id: string) => {
        return this.loanRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createLoan = async (loan: Loan) => {
        this.loading = true;
        try {
            await agent.Loans.create(loan);
            runInAction(() => {
                this.loanRegistry.set(loan.id,loan);
                this.selectedLoan = loan;
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

    updateLoan = async (loan: Loan) => {
        this.loading = true;
        try {
            await agent.Loans.update(loan);
            runInAction(() => {
                this.loanRegistry.set(loan.id, loan);
                this.selectedLoan = loan;
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

    deleteLoan = async (id: string) => {
        this.loading = true;
        try {
            await agent.Loans.delete(id);
            runInAction(() => {
                this.loanRegistry.delete(id);
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