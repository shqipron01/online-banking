import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import BranchListItem from "./BranchListItem";



export default observer(function BranchList() {
    const { branchStore } = useStore();
    const { groupedBranch } = branchStore;


    return (
        <>
            {groupedBranch.map(([group, branches]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {branches.map(branch => (
                                <BranchListItem key={branch.id} branch={branch} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})