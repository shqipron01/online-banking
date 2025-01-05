import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import InfiniteScroll from 'react-infinite-scroller';
import ContactListItemPlaceholder from "./ContactListItemPlaceholder";
import ContactList from "./ContactList";
import ContactFilters from "./ContactFilters";


export default observer (function ContactDashboard() {
    const {contactStore} = useStore();
    const {loadContacts, contactRegistry, setPagingParams, pagination} = contactStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(contactRegistry.size <= 1) loadContacts();
    }, [contactRegistry.size, loadContacts])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadContacts().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createContact' positive content='Create Contact' />
            </Grid.Row>
            <Grid.Column width='10'>
                {contactStore.loadingInitial && !loadingNext ? (
                    <>
                        <ContactListItemPlaceholder/>
                        <ContactListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <ContactList />
                </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <ContactFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})