import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function PaymentList(){
    const {paymentStore} = useStore();
    const {deletePayment,paymentsByDate,loading} = paymentStore;
    const [target,setTarget] = useState('');

    function handlePaymentDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deletePayment(id);
    }
    
    return(
    
    <Segment>
        <Item.Group >
            {paymentsByDate.map(payment =>(
            <Item key={payment.id} >
            <Item.Content>
            <h3>Payment Details</h3>
            <Item.Description>
                <div>{payment.account}</div>
                <div>{payment.amount}</div>
                <div>{payment.payee}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/managePayment/${payment.id}`} color='blue' content="Edit"/>
                <Button 
                name={payment.id}
                loading={loading && target===payment.id} onClick={(e) => handlePaymentDelete(e,payment.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
