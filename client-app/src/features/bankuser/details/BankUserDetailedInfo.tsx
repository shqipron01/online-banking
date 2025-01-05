import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { format } from 'date-fns';
import { BankUser } from '../../../app/models/bankuser';

interface Props {
    bankuser: BankUser
}

export default observer(function BankUserDetailedInfo({ bankuser }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='book' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{bankuser.name}</p>
                        <p>{bankuser.surname}</p>
                        <p>{bankuser.username}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {format(bankuser.date!, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{bankuser.email}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})