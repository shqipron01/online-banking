import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Salary } from '../../../app/models/salary';

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
    salary:Salary
}

export default observer (function SalaryDetailedHeader({salary}: Props) {
    const {salaryStore} = useStore();
    const {deleteSalary,loading} = salaryStore;
    const [target,setTarget] = useState('');

    function handleSalaryDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteSalary(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/Salary.jpg' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={salary.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{format(salary.date!, 'dd MMM yyyy')}</p>
                                <p>
                                   {salary.anualSalary}
                                  
                                </p>
                                <p> {salary.monthlyPayment}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={salary.id}
                    loading={loading && target === salary.id} 
                    onClick={(e) => handleSalaryDelete(e,salary.id)} 
                    as={Link} to='/salary'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageSalary/${salary.id}`} color='blue' floated='left'>
                    Manage Salary
                </Button>
            </Segment>
        </Segment.Group>
    )
})