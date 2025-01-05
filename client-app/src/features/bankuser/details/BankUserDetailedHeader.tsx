import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { BankUser } from '../../../app/models/bankuser';

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
    bankuser: BankUser
}

export default observer (function BankUserDetailedHeader({bankuser}: Props) {
    const {bankuserStore} = useStore();
    const {deleteBankUser,loading} =bankuserStore;
    const [target,setTarget] = useState('');

    function handleBankUserDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBankUser(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/User.jpg' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={bankuser.username}
                                  
                                    style={{color: 'white'}}
                                />
                                <p>{format(bankuser.date!, 'dd MMM yyyy')}</p>
                                <p>{bankuser.name}</p>
                                <p>{bankuser.surname}</p>
                                <p>{bankuser.email}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={bankuser.id}
                    loading={loading && target === bankuser.id} 
                    onClick={(e) => handleBankUserDelete(e,bankuser.id)} 
                    as={Link} to='/bankuser'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageBankUser/${bankuser.id}`} color='blue' floated='left'>
                    Manage User
                </Button>
            </Segment>
        </Segment.Group>
    )
})