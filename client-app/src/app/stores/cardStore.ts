import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Cards } from "../models/card";
import {format} from 'date-fns';
import { Pagination, PagingParams } from "../models/pagination";


export default class CardStore {
    cardRegistry = new Map<string, Cards>();
    selectedCard: Cards | undefined = undefined;
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

    get cardsByDate() {
        return Array.from(this.cardRegistry.values()).sort((a, b) => a.expirationDate!.getTime() - b.expirationDate!.getTime());
    }

    get groupedCards() {
        return Object.entries(
            this.cardsByDate.reduce((cards, card) => {
                const date = format(card.expirationDate!, 'dd MMM yyyy');
                cards[date] = cards[date] ? [...cards[date], card] : [card];
                return cards;
            }, {} as {[key: string]: Cards[]})
        )
    }

    loadCards = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Card.list(this.axiosParams);
            result.data.forEach(card =>{
                this.setCard(card);
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

    loadCard = async (id: string) => {
        let card = this.getCard(id);
        if (card) {
            this.selectedCard = card;
            return card;
        } else {
            this.loadingInitial = true;
            try {
                card = await agent.Card.details(id);
                this.setCard(card);
                runInAction(() => {
                    this.selectedCard = card;
                })
                this.setLoadingInitial(false);
                return card;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setCard = (card: Cards) => {
        card.expirationDate = new Date(card.expirationDate!);
        this.cardRegistry.set(card.id, card);
    }

    private getCard = (id: string) => {
        return this.cardRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createCard = async (card: Cards) => {
        this.loading = true;
        try {
            await agent.Card.create(card);
            runInAction(() => {
                this.cardRegistry.set(card.id, card);
                this.selectedCard = card;
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

    updateCard = async (card: Cards) => {
        this.loading = true;
        try {
            await agent.Card.update(card);
            runInAction(() => {
                this.cardRegistry.set(card.id, card);
                this.selectedCard = card;
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

    deleteCard = async (id: string) => {
        this.loading = true;
        try {
            await agent.Card.delete(id);
            runInAction(() => {
                this.cardRegistry.delete(id);
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
