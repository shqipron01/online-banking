import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CardDetailedInfo from "./CardDetailedInfo";
import CardDetailedHeader from "./CardDetaledHeader";




export default observer (function CardDetails(){
    const {cardStore} = useStore();
    const {selectedCard: card, loadCard, loadingInitial} = cardStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCard(id);
    }, [id, loadCard])

    if(loadingInitial || !card) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={9}>
                <CardDetailedHeader card={card} />
            </Grid.Column>
            <Grid.Column width={7}>
                <CardDetailedInfo card={card} />
            </Grid.Column>
        </Grid>
    )
})