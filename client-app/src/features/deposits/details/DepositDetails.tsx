import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import DepositDetailedInfo from "./DepositDetailedInfo";
import DepositDetaledHeader from "./DepositDetaledHeader";


export default observer (function DepositDetails(){
    const {depositStore} = useStore();
    const {selectedDeposit: deposit, loadDeposit, loadingInitial} = depositStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadDeposit(id);
    }, [id, loadDeposit])

    if(loadingInitial || !deposit) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <DepositDetaledHeader deposit={deposit} />
            </Grid.Column>
            <Grid.Column width={7}>
                <DepositDetailedInfo  deposit={deposit}/>
            </Grid.Column>
        </Grid>
    )
})