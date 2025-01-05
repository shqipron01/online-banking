import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Withdraw } from "../../../app/models/withdraw";
import {format} from 'date-fns';

interface Props{
    withdraw: Withdraw
}

export default function WithdrawListItem({withdraw}: Props) {


    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/withdraws/${withdraw.id}`}>
                                {withdraw.accountNumber}
                            </Item.Header>
                            <Item.Description>Withdraw</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(withdraw.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Amount: {withdraw.amount}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={withdraw.pin} />
                </span>
                <Button
                    as={Link}
                    to={`/withdraws/${withdraw.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}