import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function CardList(){
    const {cardStore} = useStore();
    const {deleteCard,cardsByDate,loading} = cardStore;
    const [target,setTarget] = useState('');

    function handleBanchDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteCard(id);
    }
    
    return(
     
    <Segment >
        <Item.Group >
            {cardsByDate.map(card =>(
            <Item key={card.id} >
            <Item.Content>

            <h3>Card Details</h3>
            <Item.Description >
                <div>{card.accountNumber}</div>
                <div>{card.cardType}</div>
                <div>{card.cardNumber}</div>
           
            </Item.Description>
            <Item.Extra >
            <Button as={Link}  to={`/manageCard/${card.id}`} color="blue" content="Edit"/>
                <Button 
                name={card.id}
                loading={loading && target=== card.id} onClick={(e) => handleBanchDelete(e,card.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>

    )
  
})