import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import AccountFilters from "./DepositFilters";
import InfiniteScroll from 'react-infinite-scroller';
import DepositListItemPlaceholder from "./DepositListItemPlaceholder";
import DepositList from "./DepositList";


export default observer (function DepositDashboard() {
    const {depositStore} = useStore();
    const {loadDeposits, depositRegistry, setPagingParams, pagination} = depositStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(depositRegistry.size <= 1) loadDeposits();
    }, [depositRegistry.size, loadDeposits])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadDeposits().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createDeposit' positive content='Create Deposit' />
            </Grid.Row>
            <Grid.Column width='10'>
                {depositStore.loadingInitial && !loadingNext ? (
                    <>
                        <DepositListItemPlaceholder/>
                        <DepositListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <DepositList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <AccountFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})