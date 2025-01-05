import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TransactionListItem from "./TransactionListItem";



export default observer(function TransactionList() {
    const { transactionStore } = useStore();
    const { groupedTransaction } = transactionStore;


    return (
        <>
            {groupedTransaction.map(([group,transactions]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {transactions.map(transaction => (
                                <TransactionListItem key={transaction.id} transaction={transaction} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})