import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TransactionDetailedInfo from "./TransactionDetailedInfo";
import TransactionDetaledHeader from "./TransactionDetaledHeader";


export default observer (function TransactionDetails(){
    const {transactionStore} = useStore();
    const {selectedTransaction:transaction, loadTransaction, loadingInitial} = transactionStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadTransaction(id);
    }, [id, loadTransaction])

    if(loadingInitial || !transaction) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <TransactionDetaledHeader transaction={transaction} />
            </Grid.Column>
            <Grid.Column width={7}>
                <TransactionDetailedInfo transaction={transaction}/>
            </Grid.Column>
        </Grid>
    )
})