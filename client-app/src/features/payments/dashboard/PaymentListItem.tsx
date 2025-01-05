import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Payment } from "../../../app/models/payment";

interface Props {
    payment:Payment
}

export default function PaymentListItem({payment}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/payment/${payment.id}`}>
                                {payment.account}
                            </Item.Header>
                            <Item.Description>Payment</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(payment.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Amount: {payment.amount}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={payment.payee} />
                </span>
                <Button
                    as={Link}
                    to={`/payment/${payment.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}