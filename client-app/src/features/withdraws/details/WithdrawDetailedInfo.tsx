import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Withdraw} from "../../../app/models/withdraw";
import {format} from 'date-fns';

interface Props {
    withdraw: Withdraw
}

export default observer(function AccountDetailedInfo({withdraw}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='book'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{withdraw.pin}</p>
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
                {format(withdraw.date!, 'dd MMM yyyy h:mm aa')}
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
                        <span>{withdraw.amount}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})