import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import BalanceFilters from "./BalanceFilters";
import BalanceList from "./BalanceList";
import InfiniteScroll from 'react-infinite-scroller';
import BalanceListItemPlaceholder from "./BalanceListItemPlaceholder";



export default observer (function BalanceDashboard() {
    const {balanceStore} = useStore();
    const {loadBalances, balanceRegistry, setPagingParams, pagination} = balanceStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        if(balanceRegistry.size <= 1) loadBalances();
    }, [balanceRegistry.size, loadBalances])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadBalances().then(() => setLoadingNext(false));
    }

    
    return(
        <Grid>
            <Grid.Row>
                <Button as={NavLink} to='/createBalance' positive content='Create Balance' />
            </Grid.Row>
            <Grid.Column width='10'>
                {balanceStore.loadingInitial && !loadingNext ? (
                    <>
                        <BalanceListItemPlaceholder />
                        <BalanceListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                   <BalanceList /> 
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <BalanceFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})