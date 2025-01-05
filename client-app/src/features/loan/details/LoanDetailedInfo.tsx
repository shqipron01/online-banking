import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {format} from 'date-fns';
import { Loan } from '../../../app/models/loan';


interface Props {
    loan:Loan
}

export default observer(function LoanDetailedInfo({loan}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='book'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{loan.name}</p>
                        <p>{loan.surname}</p>
                        <p>{loan.accNumber}</p>
                        <p>{loan.type}</p>
                        <p>{loan.amount}</p>
                        <p>{loan.payments}</p>
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
              {format(loan.loanDate!, 'dd MMM yyyy h:mm aa')}
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
                        <span>{loan.duration}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})