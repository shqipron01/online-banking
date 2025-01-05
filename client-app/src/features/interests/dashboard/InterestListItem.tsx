import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Interest } from "../../../app/models/interest";

interface Props {
    interest:Interest
}

export default function InterestListItem({interest}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/interest/${interest.id}`}>
                                {interest.type}
                            </Item.Header>
                            <Item.Description>Loan Interest</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(interest.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Rate: {interest.interestRate}</div>
                    <div>Months: {interest.monthsNumber}</div>
                  
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={interest.type} />
                </span>
                <Button
                    as={Link}
                    to={`/interest/${interest.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}