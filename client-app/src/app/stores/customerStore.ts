import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Customer } from "../models/customer";
import { Pagination, PagingParams } from "../models/pagination";
import { format } from 'date-fns';

export default class CustomerStore {
    customerRegistry = new Map<string, Customer>();
    selectedCustomer: Customer | undefined = undefined;
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
    get customerByDate() {
        return Array.from(this.customerRegistry.values()).sort((a, b) => a.birthDate!.getTime() - b.birthDate!.getTime());
    }

    get groupedCustomers() {
        return Object.entries(
            this.customerByDate.reduce((customers, customer) => {
                const date = format(customer.birthDate!, 'dd MMM yyyy');
                customers[date] = customers[date] ? [...customers[date], customer] : [customer];
                return customers;
            }, {} as { [key: string]: Customer[] })
        )
    }

    loadCustomers = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Customers.list(this.axiosParams);
            result.data.forEach(customer => {
                this.setCustomer(customer);
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
    loadCustomer = async (id: string) => {
        let customer = this.getCustomer(id);
        if (customer) {
            this.selectedCustomer = customer;

            return customer;
        } else {
            this.loadingInitial = true;
            try {

                customer = await agent.Customers.details(id);
                this.setCustomer(customer);
                runInAction(() => {
                    this.selectedCustomer = customer;

                })
                this.setLoadingInitial(false);
                return customer;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setCustomer = (customer: Customer) => {
        customer.birthDate = new Date(customer.birthDate!);
        this.customerRegistry.set(customer.id, customer);
    }

    private getCustomer = (id: string) => {
        return this.customerRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createCustomer = async (customer: Customer) => {

        this.loading = true;

        try {
            await agent.Customers.create(customer);
            runInAction(() => {
                this.customerRegistry.set(customer.id, customer);
                this.selectedCustomer = customer;
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

    updateCustomer = async (customer: Customer) => {

        this.loading = true;
        try {
            await agent.Customers.update(customer);
            runInAction(() => {
                this.customerRegistry.set(customer.id, customer);
                this.selectedCustomer = customer;
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
    deleteCustomer = async (id: string) => {
        this.loading = true;
        try {
            await agent.Customers.delete(id);
            runInAction(() => {
                this.customerRegistry.delete(id);
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