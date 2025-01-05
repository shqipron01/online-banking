import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Interest } from "../models/interest";
import { Pagination, PagingParams } from "../models/pagination";
import { format } from 'date-fns';


export default class InterestStore {
    interestRegistry = new Map<string, Interest>();
    selectedInterest: Interest | undefined = undefined;
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

    get interestByDate() {
        return Array.from(this.interestRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedInterest() {
        return Object.entries(
            this.interestByDate.reduce((interests, interest) => {
                const date = format(interest.date!, 'dd MMM yyyy');
                interests[date] = interests[date] ? [...interests[date], interest] : [interest];
                return interests;
            }, {} as { [key: string]: Interest[] })
        )
    }
    loadInterests = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Interests.list(this.axiosParams);
            result.data.forEach(interest => {
                this.setInterest(interest);
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
    loadInterest = async (id: string) => {
        let interest = this.getInterest(id);
        if (interest) {
            this.selectedInterest = interest;

            return interest;
        } else {
            this.loadingInitial = true;
            try {

                interest = await agent.Interests.details(id);
                this.setInterest(interest);
                runInAction(() => {
                    this.selectedInterest = interest;

                })
                this.setLoadingInitial(false);
                return interest;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setInterest = (interest: Interest) => {
        interest.date = new Date(interest.date!);
        this.interestRegistry.set(interest.id, interest);
    }

    private getInterest = (id: string) => {
        return this.interestRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createInterest = async (interest: Interest) => {

        this.loading = true;

        try {
            await agent.Interests.create(interest);
            runInAction(() => {
                this.interestRegistry.set(interest.id, interest);
                this.selectedInterest = interest;
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
    updateInterest = async (interest: Interest) => {
        this.loading = true;
        try {
            await agent.Interests.update(interest);
            runInAction(() => {
                this.interestRegistry.set(interest.id, interest);
                this.selectedInterest = interest;
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

    deleteInterest = async (id: string) => {

        this.loading = true;
        try {
            await agent.Interests.delete(id);
            runInAction(() => {
                this.interestRegistry.delete(id);
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