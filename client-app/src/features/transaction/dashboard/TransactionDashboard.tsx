import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import InfiniteScroll from 'react-infinite-scroller';
import TransactionListItemPlaceholder from "./TransactionListItemPlaceholder";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";


export default observer (function TransactionDashboard() {
    const {transactionStore} = useStore();
    const {loadTransactions, transactionRegistry, setPagingParams, pagination} = transactionStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(transactionRegistry.size <= 1) loadTransactions();
    }, [transactionRegistry.size, loadTransactions])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadTransactions().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createTransaction' positive content='Create Transaction' />
            </Grid.Row>
            <Grid.Column width='10'>
                {transactionStore.loadingInitial && !loadingNext ? (
                    <>
                        <TransactionListItemPlaceholder/>
                        <TransactionListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <TransactionList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <TransactionFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})