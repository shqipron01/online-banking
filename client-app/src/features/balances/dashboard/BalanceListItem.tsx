import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";
import {format} from 'date-fns';


interface Props {
    balance: Balance
}

export default function BalanceListItem({balance}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/balances/${balance.id}`}>
                                {balance.accountNumber}
                            </Item.Header>
                            <Item.Description>Balance</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(balance.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Amount: {balance.amount}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={balance.accountType} />
                </span>
                <Button
                    as={Link}
                    to={`/balances/${balance.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}