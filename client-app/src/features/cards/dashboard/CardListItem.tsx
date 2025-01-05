import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Cards } from "../../../app/models/card";
import {format} from 'date-fns';


interface Props{
    card: Cards
}

export default function CardListItem({card}: Props) {

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/cards/${card.id}`}>
                                {card.accountNumber}
                            </Item.Header>
                            <Item.Description>Bank Card</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(card.expirationDate!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Card number: {card.cardNumber}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={card.cardType} />
                </span>
                <Button
                    as={Link}
                    to={`/cards/${card.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}