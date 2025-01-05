import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Salary } from "../models/salary";
import { format } from 'date-fns';

export default class SalaryStore {
    salaryRegistry = new Map<string, Salary>();
    selectedSalary: Salary | undefined = undefined;
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

    get salaryByDate() {
        return Array.from(this.salaryRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedSalary() {
        return Object.entries(
            this.salaryByDate.reduce((salarys, salary) => {
                const date = format(salary.date!, 'dd MMM yyyy');
                salarys[date] = salarys[date] ? [...salarys[date], salary] : [salary];
                return salarys;
            }, {} as { [key: string]: Salary[] })
        )
    }

    loadSalarys = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Salarys.list(this.axiosParams);
            result.data.forEach(salary => {
                this.setSalary(salary);
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
    loadSalary = async (id: string) => {
        let salary = this.getSalary(id);
        if (salary) {
            this.selectedSalary = salary;

            return salary;
        } else {
            this.loadingInitial = true;
            try {

                salary = await agent.Salarys.details(id);
                this.setSalary(salary);
                runInAction(() => {
                    this.selectedSalary = salary;

                })
                this.setLoadingInitial(false);
                return salary;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setSalary = (salary: Salary) => {
        salary.date = new Date(salary.date!);
        this.salaryRegistry.set(salary.id, salary);
    }

    private getSalary = (id: string) => {
        return this.salaryRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createSalary = async (salary: Salary) => {

        this.loading = true;

        try {
            await agent.Salarys.create(salary);
            runInAction(() => {
                this.salaryRegistry.set(salary.id, salary);
                this.selectedSalary = salary;
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
    updateSalary = async (salary: Salary) => {
        this.loading = true;
        try {
            await agent.Salarys.update(salary);
            runInAction(() => {
                this.salaryRegistry.set(salary.id, salary);
                this.selectedSalary = salary;
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

    deleteSalary = async (id: string) => {

        this.loading = true;
        try {
            await agent.Salarys.delete(id);
            runInAction(() => {
                this.salaryRegistry.delete(id);
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