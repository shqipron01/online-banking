import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function CustomerList(){
    const {customerStore} = useStore();
    const {deleteCustomer,customerByDate,loading} = customerStore;
    const [target,setTarget] = useState('');

    function handleCustomerDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteCustomer(id);
    }
    
    return(
    
    <Segment >
        <Item.Group >
            {customerByDate.map(customer =>(
            <Item key={customer.id} >
            <Item.Content >
            <h3>Customer Details</h3>
            <Item.Description >
                <div>{customer.address}</div>
                <div>{customer.email}</div>
                <div>{customer.address}</div>
                <div>{customer.email}</div>
                <div>{customer.tel}</div>
                <div>{customer.gender}</div>
                <div>{customer.bank}</div>
                <div>{customer.accNumber}</div>
            </Item.Description>
            <Item.Extra id="button">
            <Button as={Link}  to={`/manageCustomer/${customer.id}`} color="blue" content="Edit"/>
                <Button 
                name={customer.id}
                loading={loading && target===customer.id} onClick={(e) => handleCustomerDelete(e,customer.id)} content="Delete"  color='red'/>

            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
