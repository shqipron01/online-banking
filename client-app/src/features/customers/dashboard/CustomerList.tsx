import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CustomerListItem from "./CustomerListItem";



export default observer(function CustomerList() {
    const { customerStore } = useStore();
    const { groupedCustomers } = customerStore;


    return (
        <>
            {groupedCustomers.map(([group, customers]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {customers.map(customer => (
                                <CustomerListItem key={customer.id}  customer={customer} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})