import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Transaction } from '../../../app/models/transaction';

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
    transaction:Transaction
}

export default observer (function TransactionDetailedHeader({transaction}: Props) {
    const {transactionStore} = useStore();
    const {deleteTransaction,loading} = transactionStore;
    const [target,setTarget] = useState('');

    function handleTransactionDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteTransaction(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/transactionImages/${transaction.type}.jpg`} fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={transaction.type}
                                    style={{color: 'white'}}
                                />
                                <p>{format(transaction.date!, 'dd MMM yyyy')}</p>
                                <p>{transaction.amount}</p>
                                <p>{transaction.payee}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={transaction.id}
                    loading={loading && target === transaction.id} 
                    onClick={(e) => handleTransactionDelete(e,transaction.id)} 
                    as={Link} to='/transaction'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageTransaction/${transaction.id}`} color='blue' floated='left'>
                    Manage Transaction
                </Button>
            </Segment>
        </Segment.Group>
    )
})