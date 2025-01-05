import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Contact } from "../models/contact";
import { Pagination, PagingParams } from "../models/pagination";
import { format } from 'date-fns';




export default class ContactStore {
    contactRegistry = new Map<string, Contact>();
    selectedContact: Contact | undefined = undefined;
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

    get contactByDate() {
        return Array.from(this.contactRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedContact() {
        return Object.entries(
            this.contactByDate.reduce((contacts, contact) => {
                const date = format(contact.date!, 'dd MMM yyyy');
                contacts[date] = contacts[date] ? [...contacts[date], contact] : [contact];
                return contacts;
            }, {} as { [key: string]: Contact[] })
        )
    }

    loadContacts = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Contacts.list(this.axiosParams);
            result.data.forEach(contact => {
                this.setContact(contact);
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

    loadContact = async (id: string) => {
        let contact = this.getContact(id);
        if (contact) {
            this.selectedContact = contact;
            return contact;
        } else {
            this.loadingInitial = true;
            try {

                contact = await agent.Contacts.details(id);
                this.setContact(contact);
                runInAction(() => {
                    this.selectedContact = contact;

                })
                this.setLoadingInitial(false);
                return contact;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setContact = (contact: Contact) => {
        contact.date = new Date(contact.date!);
        this.contactRegistry.set(contact.id, contact);
    }

    private getContact = (id: string) => {
        return this.contactRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createContact = async (contact: Contact) => {

        this.loading = true;

        try {
            await agent.Contacts.create(contact);
            runInAction(() => {
                this.contactRegistry.set(contact.id, contact);
                this.selectedContact = contact;
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

    updateContact = async (contact: Contact) => {

        this.loading = true;
        try {
            await agent.Contacts.update(contact);
            runInAction(() => {
                this.contactRegistry.set(contact.id, contact);
                this.selectedContact = contact;
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
    deleteContact = async (id: string) => {
        this.loading = true;
        try {
            await agent.Contacts.delete(id);
            runInAction(() => {
                this.contactRegistry.delete(id);
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