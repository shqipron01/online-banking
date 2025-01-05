import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import InfiniteScroll from 'react-infinite-scroller';
import CustomerListItemPlaceholder from "./CustomerListItemPlaceholder";
import CustomerList from "./CustomerList";
import CustomerFilters from "./CustomerFilters";


export default observer (function CustomerDashboard() {
    const {customerStore} = useStore();
    const {loadCustomers, customerRegistry, setPagingParams, pagination} = customerStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(customerRegistry.size <= 1) loadCustomers();
    }, [customerRegistry.size, loadCustomers])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadCustomers().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createCustomer' positive content='Create Customer' />
            </Grid.Row>
            <Grid.Column width='10'>
                {customerStore.loadingInitial && !loadingNext ? (
                    <>
                        <CustomerListItemPlaceholder/>
                        <CustomerListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <CustomerList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <CustomerFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})