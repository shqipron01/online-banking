import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function TransferList(){
    const {transferStore} = useStore();
    const {deleteTransfer,transfersByDate,loading} = transferStore;
    const [target,setTarget] = useState('');

    function handleBanchDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteTransfer(id);
    }
    
    return(
     

    <Segment>
        <Item.Group >
            {transfersByDate.map(transfer =>(
            <Item key={transfer.id} >
            <Item.Content>
            <h3>Transfer Details</h3>
            <Item.Description >
                <div>{transfer.transferNumber}</div>
                <div>{transfer.accountNumber}</div>
                <div>{transfer.amount}</div>
                <div>{transfer.payee}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageTransfer/${transfer.id}`} content="Edit" color='blue'/>
                <Button 
                name={transfer.id}
                loading={loading && target=== transfer.id} onClick={(e) => handleBanchDelete(e,transfer.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>

    )
  
})
