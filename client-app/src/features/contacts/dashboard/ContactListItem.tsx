import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Contact } from "../../../app/models/contact";

interface Props {
    contact:Contact
}

export default function ContactListItem({contact}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/contacts/${contact.id}`}>
                             {contact.name} <></>
                            {contact.surname}
                               
                            
                            </Item.Header>
                            <Item.Description>Contact</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(contact.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Email: {contact.email}</div>
                    <div>Phone number: {contact.phoneNumber}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={contact.message} />
                </span>
                <Button
                    as={Link}
                    to={`/contact/${contact.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}