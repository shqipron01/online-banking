import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BranchDetailedHeader from "./BranchDetailedHeader";
import BranchDetailedInfo from "./BranchDetailedInfo";


export default observer (function BranchDetails(){
    const {branchStore} = useStore();
    const {selectedBranch: branch, loadBranch, loadingInitial} = branchStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBranch(id);
    }, [id, loadBranch])

    if(loadingInitial || !branch) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <BranchDetailedHeader branch={branch} />
            </Grid.Column>
            <Grid.Column width={7}>
                <BranchDetailedInfo branch={branch}/>
            </Grid.Column>
        </Grid>
    )
})