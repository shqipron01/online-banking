import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function InterestList(){
    const {interestStore} = useStore();
    const {deleteInterest,interestByDate,loading} = interestStore;
    const [target,setTarget] = useState('');

    function handleInterestDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteInterest(id);
    }
    
    return(
    
    <Segment>
        <Item.Group >
            {interestByDate.map(interest =>(
            <Item key={interest.id} >
            <Item.Content>

            <h3>Interest Details</h3>
            <Item.Description>
                <div>{interest.type}</div>
                <div>{interest.amount}</div>
                <div>{interest.interestRate}</div>
                <div>{interest.monthsNumber}</div>
            </Item.Description>
            <Item.Extra >
            <Button as={Link}  to={`/manageInterest/${interest.id}`} color="blue" content="Edit"/>
                <Button 
                name={interest.id}
                loading={loading && target===interest.id} onClick={(e) => handleInterestDelete(e,interest.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
