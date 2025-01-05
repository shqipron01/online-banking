import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import DepositListItem from "./DepositListItem";



export default observer(function DepositList() {
    const { depositStore } = useStore();
    const { groupedDeposit } = depositStore;


    return (
        <>
            {groupedDeposit.map(([group, deposits]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {deposits.map(deposit => (
                                <DepositListItem key={deposit.id} deposit={deposit} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})