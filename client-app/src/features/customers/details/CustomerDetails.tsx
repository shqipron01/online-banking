import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { useStore } from "../../../app/stores/store";
import CustomerDetailedInfo from "./CustomerDetailedInfo";
import CustomerDetaledHeader from "./CustomerDetaledHeader";



export default observer (function CustomerDetails(){
    const {customerStore} = useStore();
    const {selectedCustomer: customer, loadCustomer, loadingInitial} = customerStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCustomer(id);
    }, [id, loadCustomer])

    if(loadingInitial || !customer) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <CustomerDetaledHeader customer={customer} />
            </Grid.Column>
            <Grid.Column width={7}>
                <CustomerDetailedInfo customer={customer}/>
            </Grid.Column>
        </Grid>
    )
})