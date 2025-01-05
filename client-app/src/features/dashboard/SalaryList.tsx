import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function SalaryList(){
    const {salaryStore} = useStore();
    const {deleteSalary,salaryByDate,loading} = salaryStore;
    const [target,setTarget] = useState('');

    function handleSalaryDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteSalary(id);
    }
    
    return(

    <Segment>
        <Item.Group >
            {salaryByDate.map(salary =>(
            <Item key={salary.id} >
            <Item.Content>
            <h3>Salary Details</h3>
            <Item.Description>
                <div>{salary.accountNumber}</div>
                <div>{salary.anualSalary}</div>
                <div>{salary.monthlyPayment}</div>
            </Item.Description>
            <Item.Extra>
            <Button as={Link}  to={`/manageSalary/${salary.id}`} content="Edit" color='blue'/>
                <Button 
                name={salary.id}
                loading={loading && target===salary.id} onClick={(e) => handleSalaryDelete(e,salary.id)} content="Delete" color='red'/>
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>
     
    )
})
