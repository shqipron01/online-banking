import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import TransferFilters from "./TransferFilters";
import TransferList from "./TransferList";
import InfiniteScroll from 'react-infinite-scroller';
import TransferListItemPlaceholder from "./TransferListItemPlaceholder";



export default observer (function TransferDashboard() {
    const {transferStore} = useStore();
    const {loadTransfers, transferRegistry, setPagingParams, pagination} = transferStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        if(transferRegistry.size <= 1) loadTransfers();
    }, [transferRegistry.size, loadTransfers])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadTransfers().then(() => setLoadingNext(false));
    }

    
    return(
        <Grid>
            <Grid.Row>
                <Button as={NavLink} to='/createTransfer' positive content='Create Transfer' />
            </Grid.Row>
            <Grid.Column width='10'>
            {transferStore.loadingInitial && !loadingNext ? (
                    <>
                        <TransferListItemPlaceholder />
                        <TransferListItemPlaceholder />
                    </>
                ) : (
                        <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <TransferList />
                    </InfiniteScroll>
                )}    
            </Grid.Column>
            <Grid.Column width='6'>
                <TransferFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})