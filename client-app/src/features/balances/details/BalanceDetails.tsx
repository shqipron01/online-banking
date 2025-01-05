import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BalanceDetailedInfo from "./BalanceDetailedInfo";
import BalanceDetailedHeader from "./BalanceDetaledHeader";



export default observer (function BalanceDetails(){
    const {balanceStore} = useStore();
    const {selectedBalance: balance, loadBalance, loadingInitial} = balanceStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBalance(id);
    }, [id, loadBalance])

    if(loadingInitial || !balance) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={9}>
                <BalanceDetailedHeader balance={balance} />
            </Grid.Column>
            <Grid.Column width={7}>
                <BalanceDetailedInfo balance={balance}/>
            </Grid.Column>
        </Grid>
    )
})