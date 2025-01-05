import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Withdraw} from "../../../app/models/withdraw";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

const withdrawImageStyle = {
    filter: 'brightness(30%)'
};

const withdrawImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    withdraw: Withdraw
}

export default observer (function WithdrawDetailedHeader({withdraw}: Props) {
    const {withdrawStore} = useStore();
    const {deleteWithdraw,loading} = withdrawStore;
    const [target,setTarget] = useState('');

    function handleWithdrawDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteWithdraw(id);
    }

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/withdrawImages/${withdraw.amount}.jpg`} fluid style={withdrawImageStyle}/>
                <Segment style={withdrawImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={withdraw.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{format(withdraw.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    {withdraw.amount}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={withdraw.id}
                    loading={loading && target === withdraw.id} 
                    onClick={(e) => handleWithdrawDelete(e,withdraw.id)} 
                    as={Link} to='/withdraw'  content="Delete" color='red' floated='right' />
                <Button  as={Link} to={`/manageWithdraw/${withdraw.id}`} color='blue' floated='left'>
                    Manage Withdraw
                </Button>
            </Segment>
        </Segment.Group>
    )
})