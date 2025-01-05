import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TransferDetailedInfo from "./TransferDetailedInfo";
import TransferDetailedHeader from "./TransferDetaledHeader";




export default observer (function TransferDetails(){
    const {transferStore} = useStore();
    const {selectedTransfer: transfer, loadTransfer, loadingInitial} = transferStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadTransfer(id);
    }, [id, loadTransfer])

    if(loadingInitial || !transfer) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={9}>
                <TransferDetailedHeader transfer={transfer} />
            </Grid.Column>
            <Grid.Column width={7}>
            <TransferDetailedInfo transfer={transfer} />
            </Grid.Column>
        </Grid>
    )
})