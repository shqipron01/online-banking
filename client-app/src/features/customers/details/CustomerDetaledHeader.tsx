import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Customer } from '../../../app/models/customer';

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
    customer:Customer
}

export default observer (function CustomeretailedHeader({customer}: Props) {
    const {customerStore} = useStore();
    const {deleteCustomer,loading} = customerStore;
    const [target,setTarget] = useState('');

    function handleCustomerDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteCustomer(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/Customer.jpg' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={customer.email}
                                    style={{color: 'white'}}
                                />
                                <p>{customer.name}</p>
                                <p>{customer.surname} </p>
                                <p>{format(customer.birthDate!, 'dd MMM yyyy')}</p>
                                <p> {customer.address}</p>
                                <p>{customer.tel}</p>
                                <p>{customer.gender}</p>
                                <p>{customer.bank}</p>
                                <p>{customer.accNumber}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={customer.id}
                    loading={loading && target === customer.id} 
                    onClick={(e) => handleCustomerDelete(e,customer.id)} 
                    as={Link} to='/customer'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageCustomer/${customer.id}`} color='blue' floated='left'>
                    Manage Customer
                </Button>
            </Segment>
        </Segment.Group>
    )
})