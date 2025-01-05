import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PaymentListItem from "./PaymentListItem";



export default observer(function PaymentList() {
    const { paymentStore } = useStore();
    const { groupedPayment } = paymentStore;


    return (
        <>
            {groupedPayment.map(([group, payments]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {payments.map(payment => (
                                <PaymentListItem key={payment.id} payment={payment} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})