import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Balance} from "../../../app/models/balance";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

const balanceImageStyle = {
    filter: 'brightness(30%)'
};

const balanceImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    balance: Balance
}

export default observer (function BalanceDetailedHeader({balance}: Props) {
    const {balanceStore} = useStore();
    const {deleteBalance,loading} = balanceStore;
    const [target,setTarget] = useState('');

    function handleBalanceDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBalance(id);
    }

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/balanceImages/${balance.accountType}.jpg`} fluid style={balanceImageStyle}/>
                <Segment style={balanceImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={balance.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{format(balance.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    {balance.accountType}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={balance.id}
                    loading={loading && target === balance.id} 
                    onClick={(e) => handleBalanceDelete(e,balance.id)} 
                    as={Link} to='/balances'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageBalance/${balance.id}`} color='blue' floated='left'>
                    Manage Balance
                </Button>
            </Segment>
        </Segment.Group>
    )
})