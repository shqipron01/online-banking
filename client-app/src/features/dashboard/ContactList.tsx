import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function ContactList(){
    const {contactStore} = useStore();
    const {deleteContact,contactByDate,loading} = contactStore;
    const [target,setTarget] = useState('');

    function handleContactDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteContact(id);
    }
    
    return(
    
    <Segment >
        <Item.Group >
            {contactByDate.map(contact =>(
            <Item key={contact.id} >
            <Item.Content >
                <h3>Contact Details</h3>
            <Item.Description >
                <div>{contact.name}</div>
                <div>{contact.surname}</div>
                <div>{contact.email}</div>
                <div>{contact.phoneNumber}</div>
                <div>{contact.message}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageContact/${contact.id}`} color="blue" content="Edit"/>
                <Button 
                name={contact.id}
                loading={loading && target=== contact.id} onClick={(e) => handleContactDelete(e,contact.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
