import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Payment } from "../models/payment";
import { format } from 'date-fns';

export default class PaymentStore {
    paymentRegistry = new Map<string, Payment>();
    selectedPayment: Payment | undefined = undefined;
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

    get paymentsByDate() {
        return Array.from(this.paymentRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedPayment() {
        return Object.entries(
            this.paymentsByDate.reduce((payments, payment) => {
                const date = format(payment.date!, 'dd MMM yyyy');
                payments[date] = payments[date] ? [...payments[date], payment] : [payment];
                return payments;
            }, {} as { [key: string]: Payment[] })
        )
    }
    loadPayments = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Payments.list(this.axiosParams);
            result.data.forEach(payment => {
                this.setPayment(payment);
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
    loadPayment = async (id: string) => {
        let payment = this.getPayment(id);
        if (payment) {
            this.selectedPayment = payment;

            return payment;
        } else {
            this.loadingInitial = true;
            try {

                payment = await agent.Payments.details(id);
                this.setPayment(payment);
                runInAction(() => {
                    this.selectedPayment = payment;

                })
                this.setLoadingInitial(false);
                return payment;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPayment = (payment: Payment) => {
        payment.date = new Date(payment.date!);
        this.paymentRegistry.set(payment.id, payment);
    }

    private getPayment = (id: string) => {
        return this.paymentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPayment = async (payment: Payment) => {

        this.loading = true;

        try {
            await agent.Payments.create(payment);
            runInAction(() => {
                this.paymentRegistry.set(payment.id, payment);
                this.selectedPayment = payment;
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
    updatePayment = async (payment: Payment) => {
        this.loading = true;
        try {
            await agent.Payments.update(payment);
            runInAction(() => {
                this.paymentRegistry.set(payment.id, payment);
                this.selectedPayment = payment;
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

    deletePayment = async (id: string) => {

        this.loading = true;
        try {
            await agent.Payments.delete(id);
            runInAction(() => {
                this.paymentRegistry.delete(id);
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