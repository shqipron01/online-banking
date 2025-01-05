import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoanListItem from "./LoanListItem";



export default observer(function LoanList() {
    const {loanStore } = useStore();
    const { groupedLoans} = loanStore;


    return (
        <>
            {groupedLoans.map(([group,loans]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {loans.map(loan => (
                                <LoanListItem key={loan.id} loan={loan} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})