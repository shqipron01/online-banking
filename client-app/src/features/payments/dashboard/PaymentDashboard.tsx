import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import InfiniteScroll from 'react-infinite-scroller';
import PaymentListItemPlaceholder from "./PaymentListItemPlaceholder";
import PaymentList from "./PaymentList";
import PaymentFilters from "./PaymentFilters";


export default observer (function PaymentDashboard() {
    const {paymentStore} = useStore();
    const {loadPayments, paymentRegistry, setPagingParams, pagination} = paymentStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(paymentRegistry.size <= 1) loadPayments();
    }, [paymentRegistry.size, loadPayments])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadPayments().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createPayment' positive content='Create Payment' />
            </Grid.Row>
            <Grid.Column width='10'>
                {paymentStore.loadingInitial && !loadingNext ? (
                    <>
                        <PaymentListItemPlaceholder/>
                        <PaymentListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <PaymentList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <PaymentFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})