import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Account} from "../../../app/models/account";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

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
    account: Account
}

export default observer (function AccountDetailedHeader({account}: Props) {
    const {accountStore} = useStore();
    const {deleteAccount,loading} = accountStore;
    const [target,setTarget] = useState('');

    function handleAccountDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/accountImages/${account.accountType}.jpg`} fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={account.accountType}
                                    style={{color: 'white'}}
                                />
                                <p>{format(account.openDate!, 'dd MMM yyyy')}</p>
                                <p>{account.accountNumber}</p>
                                <p>{account.balance}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={account.id}
                    loading={loading && target === account.id} 
                    onClick={(e) => handleAccountDelete(e,account.id)} 
                    as={Link} to='/accounts'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageAccount/${account.id}`} color='blue' floated='left'>
                    Manage Account
                </Button>
            </Segment>
        </Segment.Group>
    )
})