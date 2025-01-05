import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import AccountFilters from "./SalaryFilters";
import AccountList from "./SalaryList";
import InfiniteScroll from 'react-infinite-scroller';
import SalaryListItemPlaceholder from "./SalaryListItemPlaceholder";


export default observer (function SalaryDashboard() {
    const {salaryStore} = useStore();
    const {loadSalarys, salaryRegistry, setPagingParams, pagination} = salaryStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
      if(salaryRegistry.size <= 1) loadSalarys();
    }, [salaryRegistry.size, loadSalarys])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadSalarys().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Row>
            <Button as={NavLink} to='/createSalary' positive content='Create Salary' />
            </Grid.Row>
            <Grid.Column width='10'>
                {salaryStore.loadingInitial && !loadingNext ? (
                    <>
                        <SalaryListItemPlaceholder/>
                        <SalaryListItemPlaceholder/>
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