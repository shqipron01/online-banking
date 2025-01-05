import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function DepositList(){
    const {depositStore} = useStore();
    const {deleteDeposit,depositByDate,loading} = depositStore;
    const [target,setTarget] = useState('');

    function handleDepositDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteDeposit(id);
    }
    
    return(
    
    <Segment>
        <Item.Group >
            {depositByDate.map(deposit =>(
            <Item key={deposit.id} >
            <Item.Content >

            <h3>Deposit Details</h3>
            <Item.Description>
                <div>{deposit.account}</div>
                <div>{deposit.amount}</div>
                <div>{deposit.payee}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageDeposit/${deposit.id}`} color="blue" content="Edit"/>
                <Button 
                name={deposit.id}
                loading={loading && target===deposit.id} onClick={(e) => handleDepositDelete(e,deposit.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
