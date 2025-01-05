import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import CardFilters from "./CardFilters";
import CardList from "./CardList";
import InfiniteScroll from 'react-infinite-scroller';
import CardListItemPlaceholder from "./CardListItemPlaceholder";



export default observer (function CardDashboard() {
    const {cardStore} = useStore();
    const {loadCards, cardRegistry, setPagingParams, pagination} = cardStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        if(cardRegistry.size <= 1) loadCards();
    }, [cardRegistry.size, loadCards])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadCards().then(() => setLoadingNext(false));
    }
    
    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createCard' positive content='Create Card' />
            </Grid.Row>
            <Grid.Column width='10'>
            {cardStore.loadingInitial && !loadingNext ? (
                    <>
                        <CardListItemPlaceholder />
                        <CardListItemPlaceholder />
                    </>
                ) : (
                        <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <CardList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <CardFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})