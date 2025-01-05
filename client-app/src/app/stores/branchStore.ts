import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Branch } from "../models/branch";
import { Pagination, PagingParams } from "../models/pagination";
import {format} from 'date-fns';

export default class BranchStore{
    branchRegistry = new Map<string, Branch>();
    selectedBranch: Branch | undefined = undefined;
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

    get branchByDate() {
        return Array.from(this.branchRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedBranch() {
        return Object.entries(
            this.branchByDate.reduce((branches, branch) => {
                const date = format(branch.date!, 'dd MMM yyyy');
                branches[date] = branches[date] ? [...branches[date], branch] : [branch];
                return branches;
            }, {} as {[key: string]: Branch[]})
        )
    }

    loadBranches = async () => {
        this.loadingInitial = true;
        try {

            const result = await agent.Branches.list(this.axiosParams);
            result.data.forEach(branch => {
                this.setBranch(branch);
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
    loadBranch = async (id:string) =>{
        let branch= this.getBranch(id);
        if(branch){
            this.selectedBranch = branch;
            return branch;
        }else{
            this.loadingInitial=true;
            try {
                branch = await agent.Branches.details(id);
                this.setBranch(branch);
                runInAction(() =>{
                    this.selectedBranch = branch;
                })
                this.setLoadingInitial(false);
                return branch;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setBranch =(branch :Branch) =>{
        branch.date = new Date(branch.date!);
        this.branchRegistry.set(branch.id,branch);
    }

    private getBranch = (id:string) =>{
        return this.branchRegistry.get(id);
    }

    setLoadingInitial =(state:boolean) =>{
        this.loadingInitial = state;
    }

   createBranch = async (branch: Branch) => {
       this.loading=true;
  
    try {
        await agent.Branches.create(branch);
        runInAction(() =>{
            this.branchRegistry.set(branch.id,branch);
            this.selectedBranch = branch;
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
   updateBranch = async (branch : Branch) =>{
       this.loading=true;
       try {
        await agent.Branches.update(branch);
        runInAction(() =>{
            this.branchRegistry.set(branch.id,branch);
            this.selectedBranch = branch;
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
   deleteBranch = async (id : string) =>{
    this.loading=true;
    try {
     await agent.Branches.delete(id);
     runInAction(() =>{
         this.branchRegistry.delete(id);
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