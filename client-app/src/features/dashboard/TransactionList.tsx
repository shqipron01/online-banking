import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function TransactionList(){
    const {transactionStore} = useStore();
    const {deleteTransaction,transactionByDate,loading} = transactionStore;
    const [target,setTarget] = useState('');

    function handleTransactionDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteTransaction(id);
    }
    
    return(
    
    <Segment >
        <Item.Group >
            {transactionByDate.map(transaction =>(
            <Item key={transaction.id} >
            <Item.Content>
                <h3>Transaction Details</h3>
            <Item.Description >
                <div>{transaction.type}</div>
                <div>{transaction.amount}</div>
                <div>{transaction.payee}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageTransaction/${transaction.id}`} content="Edit" color='blue'/>
                <Button 
                name={transaction.id}
                loading={loading && target===transaction.id} onClick={(e) => handleTransactionDelete(e,transaction.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
