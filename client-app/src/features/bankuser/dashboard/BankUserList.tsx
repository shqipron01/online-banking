import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AccountListItem from "./BankUserListItem";
import BankUserListItem from "./BankUserListItem";



export default observer(function BankUserList() {
    const { bankuserStore } = useStore();
    const { groupedBankUsers } = bankuserStore;


    return (
        <>
            {groupedBankUsers.map(([group, bankusers]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {bankusers.map(bankuser => (
                                <BankUserListItem key={bankuser.id} bankuser={bankuser} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})