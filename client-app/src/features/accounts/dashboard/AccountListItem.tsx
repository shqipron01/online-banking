import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Account } from "../../../app/models/account";
import {format} from 'date-fns';

interface Props {
    account: Account
}

export default function AccountListItem({account}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/accounts/${account.id}`}>
                            {account.name} <></>
                             {account.surname}
                                
                            </Item.Header>
                            <Item.Description>Bank Account</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(account.openDate!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                <div>Account number: {account.accountNumber}</div>
                    <div>Balance: {account.balance}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={ account.accountType} />
                </span>
                <Button
                    as={Link}
                    to={`/accounts/${account.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}