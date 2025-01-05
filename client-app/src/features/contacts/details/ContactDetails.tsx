import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ContactDetailedInfo from "./ContactDetailedInfo";
import ContactDetaledHeader from "./ContactDetaledHeader";



export default observer (function ContactDetails(){
    const {contactStore} = useStore();
    const {selectedContact: contact, loadContact, loadingInitial} = contactStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadContact(id);
    }, [id, loadContact])

    if(loadingInitial || !contact) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <ContactDetaledHeader contact={contact} />
            </Grid.Column>
            <Grid.Column width={7}>
                <ContactDetailedInfo contact={contact}/>
            </Grid.Column>
        </Grid>
    )
})