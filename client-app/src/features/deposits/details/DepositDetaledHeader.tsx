import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Deposit } from '../../../app/models/deposit';

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
   deposit:Deposit
}

export default observer (function DepositDetailedHeader({deposit}: Props) {
    const {depositStore} = useStore();
    const {deleteDeposit,loading} =depositStore;
    const [target,setTarget] = useState('');

    function handleDepositDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteDeposit(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/depositImages/${deposit.amount}.jpg`} fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={deposit.account}
                                    style={{color: 'white'}}
                                />
                                <p>{format(deposit.date!, 'dd MMM yyyy')}</p>
                                <p>
                                   {deposit.amount} 
                                  
                                </p>
                                <p> {deposit.payee}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={deposit.id}
                    loading={loading && target === deposit.id} 
                    onClick={(e) => handleDepositDelete(e,deposit.id)} 
                    as={Link} to='/deposit'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageDeposit/${deposit.id}`} color='blue' floated='left'>
                    Manage Deposit
                </Button>
            </Segment>
        </Segment.Group>
    )
})