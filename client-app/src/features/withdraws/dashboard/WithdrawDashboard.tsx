import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import WithdrawFilters from "./WithdrawFilters";
import WithdrawList from "./WithdrawList";
import InfiniteScroll from 'react-infinite-scroller';
import WithdrawListItemPlaceholder from "./WithdrawListItemPlaceholder";



export default observer (function WithdrawDashboard() {
    const {withdrawStore} = useStore();
    const {loadWithdraws, withdrawRegistry, setPagingParams, pagination} = withdrawStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        if(withdrawRegistry.size <= 1) loadWithdraws();
      }, [withdrawRegistry.size, loadWithdraws])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadWithdraws().then(() => setLoadingNext(false));
    }
    
    return(
        <Grid>
            <Grid.Row>
                <Button as={NavLink} to='/createWithdraw' positive content='Create Withdraw' />
            </Grid.Row>
            <Grid.Column width='10'>
            {withdrawStore.loadingInitial && !loadingNext ? (
                    <>
                        <WithdrawListItemPlaceholder />
                        <WithdrawListItemPlaceholder />
                    </>
                ) : (
                        <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <WithdrawList/>
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <WithdrawFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})