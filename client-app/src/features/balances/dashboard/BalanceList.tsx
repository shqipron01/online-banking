import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import BalanceListItem from "./BalanceListItem";


export default observer(function BalanceList() {
    const { balanceStore } = useStore();
    const { groupedBalances } = balanceStore;

    return (
        <>
            {groupedBalances.map(([group, balances]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {balances.map(balance => (
                                <BalanceListItem key={balance.id} balance={balance} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})