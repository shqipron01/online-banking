import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import WithdrawListItem from "./WithdrawListItem";


export default observer(function WithdrawList() {
    const { withdrawStore } = useStore();
    const { groupeWithdraws } = withdrawStore;

    return (
        <>
            {groupeWithdraws.map(([group, withdraws]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {withdraws.map(withdraw => (
                                <WithdrawListItem key={withdraw.id} withdraw={withdraw} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})