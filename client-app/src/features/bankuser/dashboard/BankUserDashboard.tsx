import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import BankUserFilters from "./BankUserFilters";
import BankUserList from "./BankUserList";
import BankUserListItemPlaceholder from "./BankUserListItemPlaceholder";




export default observer (function BankUserDashboard() {
    const {bankuserStore} = useStore();
    const {loadBankUsers, bankUserRegistry, setPagingParams, pagination} = bankuserStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(bankUserRegistry.size <= 1) loadBankUsers();
    }, [bankUserRegistry.size, loadBankUsers])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadBankUsers().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createBankUser' positive content='Create User' />
            </Grid.Row>
            <Grid.Column width='10'>
                {bankuserStore.loadingInitial && !loadingNext ? (
                    <>
                        <BankUserListItemPlaceholder/>
                        <BankUserListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <BankUserList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <BankUserFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})