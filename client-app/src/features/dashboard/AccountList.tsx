import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function AccountList(){
    const {accountStore} = useStore();
    const {deleteAccount,accountsByDate,loading} = accountStore;
    const [target,setTarget] = useState('');

    function handleAccountDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }
    
    return(

    <Segment>
        <Item.Group >
            {accountsByDate.map(account =>(
            <Item key={account.id} >
            <Item.Content >
            <h3>Account Details</h3>
            <Item.Description >
                <div>{account.name}</div>
                <div>{account.surname}</div>
                <div>{account.accountNumber}</div>
                <div>{account.accountType}</div>
                <div>{account.balance}</div>
            </Item.Description>
           
            <Item.Extra>
            <Button as={Link}  to={`/manageAccount/${account.id}`} color="blue" content="Edit"/>
                <Button 
                name={account.id}
                loading={loading && target=== account.id} onClick={(e) => handleAccountDelete(e,account.id)} content="Delete"  color='red'/>

            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>

    )
  
})