import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {format} from 'date-fns';
import { Branch } from '../../../app/models/branch';

interface Props {
    branch:Branch
}

export default observer(function BranchDetailedInfo({branch}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='book'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{branch.bank}</p>
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <p>{branch.branchNumber}</p>
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <p>{branch.country}</p>
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <p>{branch.city}</p>
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
              {format(branch.date!, 'dd MMM yyyy h:mm aa')}
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
                        <span>{branch.address}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})