import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Transaction } from "../../../app/models/transaction";

interface Props {
   transaction:Transaction
}

export default function TransactionListItem({transaction}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/transaction/${transaction.id}`}>
                                {transaction.amount}
                            </Item.Header>
                            <Item.Description>Transaction</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(transaction.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Payee: {transaction.payee}</div>
              
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={transaction.type} />
                </span>
                <Button
                    as={Link}
                    to={`/transaction/${transaction.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}