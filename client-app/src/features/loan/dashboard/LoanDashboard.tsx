import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import LoanFilters from "./LoanFilters";
import LoanList from "./LoanList";
import LoanListItemPlaceholder from "./LoanListItemPlaceholder";



export default observer (function LoanDashboard() {
    const {loanStore} = useStore();
    const {loadLoans,loanRegistry, setPagingParams, pagination} = loanStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(loanRegistry.size <= 1) loadLoans();
    }, [loanRegistry.size, loadLoans])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadLoans().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createLoan' positive content='Create Loan' />
            </Grid.Row>
            <Grid.Column width='10'>
                {loanStore.loadingInitial && !loadingNext ? (
                    <>
                        <LoanListItemPlaceholder/>
                        <LoanListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <LoanList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <LoanFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})