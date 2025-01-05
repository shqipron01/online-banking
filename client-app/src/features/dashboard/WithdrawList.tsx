import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function WithdrawList(){
    const {withdrawStore} = useStore();
    const {deleteWithdraw,withdrawsByDate,loading} = withdrawStore;
    const [target,setTarget] = useState('');

    function handleBanchDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteWithdraw(id);
    }
    
    return(
     
    <Segment>
        <Item.Group >
            {withdrawsByDate.map(withdraw =>(
            <Item key={withdraw.id} >
            <Item.Content >
            <h3>Withdraw Details</h3>
            <Item.Description>
                <div>{withdraw.accountNumber}</div>
                <div>{withdraw.amount}</div>
                <div>{withdraw.pin}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageWithdraw/${withdraw.id}`}  content="Edit" color='blue'/>
                <Button 
                name={withdraw.id}
                loading={loading && target=== withdraw.id} onClick={(e) => handleBanchDelete(e,withdraw.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>

    )
  
})
