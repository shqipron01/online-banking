import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function LoanList(){
    const {loanStore} = useStore();
    const {deleteLoan,loansByDate,loading} = loanStore;
    const [target,setTarget] = useState('');

    function handleLoanDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteLoan(id);
    }
    
    return(

    <Segment >
        <Item.Group >
            {loansByDate.map(loan=>(
            <Item key={loan.id} >
            <Item.Content>
            <h3>Loan Details</h3>
            <Item.Description>
                <div>{loan.name}</div>
                <div>{loan.surname}</div>
                <div>{loan.accNumber}</div>
                <div>{loan.type}</div>
                <div>{loan.amount}</div>
                <div>{loan.duration}</div>
                <div>{loan.payments}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageLoan/${loan.id}`} color='blue' content="Edit"/>
                <Button 
                name={loan.id}
                loading={loading && target===loan.id} onClick={(e) => handleLoanDelete(e,loan.id)} content="Delete"  color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
