import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Branch } from '../../../app/models/branch';

const accountImageStyle = {
    filter: 'brightness(30%)'
};

const accountImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
   branch:Branch
}

export default observer (function BranchDetailedHeader({branch}: Props) {
    const {branchStore} = useStore();
    const {deleteBranch,loading} = branchStore;
    const [target,setTarget] = useState('');

    function handleBranchDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBranch(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/Bank.jpg' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={branch.bank}
                                    style={{color: 'white'}}
                                />
                                <p>{format(branch.date!, 'dd MMM yyyy')}</p>
                                <p> {branch.branchNumber}</p>
                                <p>{branch.country}</p>
                                <p>{branch.city}</p>
                                <p>  {branch.address}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={branch.id}
                    loading={loading && target === branch.id} 
                    onClick={(e) => handleBranchDelete(e,branch.id)} 
                    as={Link} to='/branches'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageBranch/${branch.id}`} color='blue' floated='left'>
                    Manage Branch
                </Button>
            </Segment>
        </Segment.Group>
    )
})