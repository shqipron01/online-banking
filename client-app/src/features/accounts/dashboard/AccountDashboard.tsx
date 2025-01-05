import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import AccountFilters from "./AccountFilters";
import AccountList from "./AccountList";
import InfiniteScroll from 'react-infinite-scroller';
import AccountListItemPlaceholder from "./AccountListItemPlaceholder"


export default observer (function AccountDashboard() {
    const {accountStore} = useStore();
    const {loadAccounts, accountRegistry, setPagingParams, pagination} = accountStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadAccounts().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createAccount' positive content='Create Account' />
            </Grid.Row>
            <Grid.Column width='10'>
                {accountStore.loadingInitial && !loadingNext ? (
                    <>
                        <AccountListItemPlaceholder/>
                        <AccountListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <AccountList />
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