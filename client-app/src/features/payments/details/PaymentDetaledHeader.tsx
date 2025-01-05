import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Payment } from '../../../app/models/payment';

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
    payment:Payment
}

export default observer (function PaymentDetailedHeader({payment}: Props) {
    const {paymentStore} = useStore();
    const {deletePayment,loading} = paymentStore;
    const [target,setTarget] = useState('');

    function handlePaymentDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deletePayment(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/Payment.jpg' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={payment.account}
                                    style={{color: 'white'}}
                                />
                                <p>{format(payment.date!, 'dd MMM yyyy')}</p>
                                <p>
                                   {payment.amount}
                                 
                                </p>
                                <p>  {payment.payee}</p>
                     
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={payment.id}
                    loading={loading && target === payment.id} 
                    onClick={(e) => handlePaymentDelete(e,payment.id)} 
                    as={Link} to='/payment'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/managePayment/${payment.id}`} color='blue' floated='left'>
                    Manage Payment
                </Button>
            </Segment>
        </Segment.Group>
    )
})