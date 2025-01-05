import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function BalanceList(){
    const {balanceStore} = useStore();
    const {deleteBalance,balancesByDate,loading} = balanceStore;
    const [target,setTarget] = useState('');

    function handleBanchDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBalance(id);
    }
    
    return(
     

    <Segment>
        <Item.Group   >
            {balancesByDate.map(balance =>(
            
            <Item key={balance.id} >
            <Item.Content >
               <h3>Balance Details</h3>
            <Item.Description>
                <div>{balance.accountNumber}</div>
                <div>{balance.accountType}</div>
                <div>{balance.amount}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageBalance/${balance.id}`} id="edit" content="Edit" color='blue'/>
                <Button 
                name={balance.id}
                loading={loading && target=== balance.id} onClick={(e) => handleBanchDelete(e,balance.id)} content="Delete" color='red'/>
                    
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>

    )
  
})