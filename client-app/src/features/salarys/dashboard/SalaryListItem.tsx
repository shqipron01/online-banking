import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Salary } from "../../../app/models/salary";

interface Props {
    salary:Salary
}

export default function SalaryListItem({salary}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/salary/${salary.id}`}>
                                {salary.accountNumber}
                            </Item.Header>
                            <Item.Description>Salary</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(salary.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>Anual Salary: {salary.anualSalary}</div>
            
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={salary.monthlyPayment} />
                </span>
                <Button
                    as={Link}
                    to={`/salary/${salary.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}