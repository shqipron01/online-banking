import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Branch } from "../../../app/models/branch";

interface Props {
    branch:Branch
}

export default function BranchListItem({branch}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/branches/${branch.id}`}>
                                {branch.bank}
                            </Item.Header>
                            <Item.Description>Bank Branch</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(branch.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Branch number: {branch.branchNumber}</div>
                    <div>Country: {branch.country}</div>
                    <div>City: {branch.city}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={branch.address} />
                </span>
                <Button
                    as={Link}
                    to={`/branches/${branch.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}