import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import WithdrawDetailedInfo from "./WithdrawDetailedInfo";
import WithdrawDetailedHeader from "./WithdrawDetaledHeader";



export default observer (function WithdrawDetails(){
    const {withdrawStore} = useStore();
    const {selectedWithdraw: withdraw, loadWithdraw, loadingInitial} = withdrawStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadWithdraw(id);
    }, [id, loadWithdraw])

    if(loadingInitial || !withdraw) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={9}>
                <WithdrawDetailedHeader withdraw={withdraw} />
            </Grid.Column>
            <Grid.Column width={7}>
                <WithdrawDetailedInfo withdraw={withdraw} />
            </Grid.Column>
        </Grid>
    )
})