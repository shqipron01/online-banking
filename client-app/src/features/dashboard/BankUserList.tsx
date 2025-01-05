import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function BankUserList(){
    const {bankuserStore} = useStore();
    const {deleteBankUser,bankUsersByDate,loading} = bankuserStore;
    const [target,setTarget] = useState('');

    function handleBankUserDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBankUser(id);
    }
    
    return(
    
    <Segment>
        <Item.Group >
            {bankUsersByDate.map(bankuser =>(
            <Item key={bankuser.id} >
            <Item.Content>
            <h3>User Details</h3>
            <Item.Description>
                <div>{bankuser.name}</div>
                <div>{bankuser.surname}</div>
                <div>{bankuser.username}</div>
                <div>{bankuser.email}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageBankUser/${bankuser.id}`}  content="Edit" color='blue'/>
                <Button 
                name={bankuser.id}
                loading={loading && target===bankuser.id} onClick={(e) => handleBankUserDelete(e,bankuser.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
