import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PaymentDetailedInfo from "./PaymentDetailedInfo";
import PaymentDetaledHeader from "./PaymentDetaledHeader";


export default observer (function PaymentDetails(){
    const {paymentStore} = useStore();
    const {selectedPayment: payment, loadPayment, loadingInitial} = paymentStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadPayment(id);
    }, [id, loadPayment])

    if(loadingInitial || !payment) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <PaymentDetaledHeader payment={payment} />
            </Grid.Column>
            <Grid.Column width={7}>
                <PaymentDetailedInfo payment={payment}/>
            </Grid.Column>
        </Grid>
    )
})