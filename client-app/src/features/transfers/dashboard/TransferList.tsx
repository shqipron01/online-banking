import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TransferListItem from "./TransferListItem";


export default observer(function TransferList() {
    const { transferStore } = useStore();
    const { groupedTransfers } = transferStore;

    return (
        <>
            {groupedTransfers.map(([group, transfers]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {transfers.map(transfer => (
                                <TransferListItem key={transfer.id} transfer={transfer} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})