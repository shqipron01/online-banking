import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import InterestListItem from "./InterestListItem";



export default observer(function    InterestList() {
    const {interestStore } = useStore();
    const { groupedInterest} = interestStore;


    return (
        <>
            {groupedInterest.map(([group,interests]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {interests.map(interest => (
                                <InterestListItem key={interest.id} interest={interest} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})