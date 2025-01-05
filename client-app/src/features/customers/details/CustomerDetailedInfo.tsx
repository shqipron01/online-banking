import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {format} from 'date-fns';
import { Customer } from '../../../app/models/customer';

interface Props {
    customer:Customer
}

export default observer(function CustomerDetailedInfo({customer}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='book'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{customer.name}</p>
                        <p>{customer.surname}</p>
                    <p>{customer.address}</p>
                    <p>{customer.email}</p>
                    <p>{customer.tel}</p>
                    <p>{customer.gender}</p>
                    <p>{customer.bank}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(customer.birthDate!, 'dd MMM yyyy h:mm aa')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{customer.accNumber}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})