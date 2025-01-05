import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Customer } from "../../../app/models/customer";

interface Props {
    customer:Customer
}

export default function CustomerListItem({customer}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/customer/${customer.id}`}>
                                {customer.name} <></> 
                                {customer.surname}                           </Item.Header>
                            <Item.Description>Bank Customer</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(customer.birthDate!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Account number: {customer.accNumber}</div>
                    <div>Address: {customer.address}</div>
                    <div>Gender: {customer.gender}</div>
                    <div>Phone number: {customer.tel}</div>
                    <div>Email: {customer.email}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={customer.bank} />
                </span>
                <Button
                    as={Link}
                    to={`/customer/${customer.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}