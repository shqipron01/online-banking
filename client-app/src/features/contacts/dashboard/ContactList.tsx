import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ContactListItem from "./ContactListItem";



export default observer(function ContactList() {
    const { contactStore } = useStore();
    const { groupedContact } = contactStore;


    return (
        <>
            {groupedContact.map(([group, contacts]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {contacts.map(contact => (
                                <ContactListItem key={contact.id} contact={contact} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})