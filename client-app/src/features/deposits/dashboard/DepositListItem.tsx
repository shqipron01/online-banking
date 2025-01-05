import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Deposit } from "../../../app/models/deposit";

interface Props {
    deposit:Deposit
}

export default function DepositListItem({deposit}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/deposit/${deposit.id}`}>
                                {deposit.account}
                            </Item.Header>
                            <Item.Description>Deposit</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(deposit.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Amount: {deposit.amount}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={deposit.payee} />
                </span>
                <Button
                    as={Link}
                    to={`/deposit/${deposit.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}