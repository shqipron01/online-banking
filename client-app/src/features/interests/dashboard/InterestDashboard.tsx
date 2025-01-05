import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import AccountFilters from "./InterestFilters";
import InfiniteScroll from 'react-infinite-scroller';
import InterestList from "./InterestList";
import InterestListItemPlaceholder from "./InterestListItemPlaceholder";


export default observer (function InterestDashboard() {
    const {interestStore} = useStore();
    const {loadInterests,interestRegistry, setPagingParams, pagination} = interestStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(interestRegistry.size <= 1) loadInterests();
    }, [interestRegistry.size, loadInterests])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadInterests().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createInterest' positive content='Create Interest' />
            </Grid.Row>
            <Grid.Column width='10'>
                {interestStore.loadingInitial && !loadingNext ? (
                    <>
                        <InterestListItemPlaceholder/>
                        <InterestListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <InterestList />
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