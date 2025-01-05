import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import AccountFilters from "./BranchFilters";
import InfiniteScroll from 'react-infinite-scroller';
import BranchListItemPlaceholder from "./BranchListItemPlaceholder";
import BranchList from "./BranchList";


export default observer (function BranchDashboard() {
    const {branchStore} = useStore();
    const {loadBranches,branchRegistry, setPagingParams, pagination} = branchStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(branchRegistry.size <= 1) loadBranches();
    }, [branchRegistry.size, loadBranches])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadBranches().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createBranch' positive content='Create Branch' />
            </Grid.Row>
            <Grid.Column width='10'>
                {branchStore.loadingInitial && !loadingNext ? (
                    <>
                        <BranchListItemPlaceholder/>
                        <BranchListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <BranchList />
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