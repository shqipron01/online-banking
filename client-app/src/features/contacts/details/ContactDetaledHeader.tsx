import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Contact } from '../../../app/models/contact';

const accountImageStyle = {
    filter: 'brightness(30%)'
};

const accountImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    contact:Contact
}

export default observer (function ContactDetailedHeader({contact}: Props) {
    const {contactStore} = useStore();
    const {deleteContact,loading} = contactStore;
    const [target,setTarget] = useState('');

    function handleContactDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteContact(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/Contact.jpg' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={contact.email}
                                    style={{color: 'white'}}
                                />
                                <p>{format(contact.date!, 'dd MMM yyyy')}</p>
                                <p>{contact.name}</p>
                                <p> {contact.surname}</p>
                                <p> {contact.phoneNumber}</p>
                                <p> {contact.message}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={contact.id}
                    loading={loading && target === contact.id} 
                    onClick={(e) => handleContactDelete(e,contact.id)} 
                    as={Link} to='/contact'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageContact/${contact.id}`} color='blue' floated='left'>
                    Manage Contacts
                </Button>
            </Segment>
        </Segment.Group>
    )
})