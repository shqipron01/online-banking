import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Cards} from "../../../app/models/card";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

const cardImageStyle = {
    filter: 'brightness(30%)'
};

const cardImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    card: Cards
}

export default observer (function CardDetailedHeader({card}: Props) {
    const {cardStore} = useStore();
    const {deleteCard,loading} = cardStore;
    const [target,setTarget] = useState('');

    function handleCardDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteCard(id);
    }

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/cardImages/${card.cardType}.jpg`} fluid style={cardImageStyle}/>
                <Segment style={cardImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={card.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{format(card.expirationDate!, 'dd MMM yyyy')}</p>
                                <p>
                                    {card.cardType}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={card.id}
                    loading={loading && target === card.id} 
                    onClick={(e) => handleCardDelete(e,card.id)} 
                    as={Link} to='/cards'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageCard/${card.id}`} color='blue' floated='left'>
                    Manage Card
                </Button>
            </Segment>
        </Segment.Group>
    )
})