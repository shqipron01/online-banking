import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AccountListItem from "./AccountListItem";



export default observer(function AccountList() {
    const { accountStore } = useStore();
    const { groupedAccounts } = accountStore;


    return (
        <>
            {groupedAccounts.map(([group, accounts]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {accounts.map(account => (
                                <AccountListItem key={account.id} account={account} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})