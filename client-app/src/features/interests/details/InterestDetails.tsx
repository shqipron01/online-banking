import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import InterestDetailedInfo from "./InterestDetailedInfo";
import InterestDetaledHeader from "./InterestDetaledHeader";



export default observer (function InterestDetails(){
    const {interestStore} = useStore();
    const {selectedInterest:interest, loadInterest, loadingInitial} = interestStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadInterest(id);
    }, [id, loadInterest])

    if(loadingInitial || !interest) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <InterestDetaledHeader interest={interest} />
            </Grid.Column>
            <Grid.Column width={7}>
                <InterestDetailedInfo interest={interest}/>
            </Grid.Column>
        </Grid>
    )
})