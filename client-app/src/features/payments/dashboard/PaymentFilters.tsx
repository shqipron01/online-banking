import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from 'react-calendar';
import { Header } from "semantic-ui-react";

export default observer(function PaymentFilters() {
    return(
        <>
            <Header />
            <Calendar />
        </>
    )
})