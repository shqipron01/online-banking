import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Interest } from '../../../app/models/interest';

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
    interest:Interest
}
export default observer (function InterestDetailedHeader({interest}: Props) {
    const {interestStore} = useStore();
    const {deleteInterest,loading} = interestStore;
    const [target,setTarget] = useState('');

    function handleInterestDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteInterest(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/interestImages/${interest.type}.jpg`} fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={interest.amount}
                                    style={{color: 'white'}}
                                />
                                <p>{format(interest.date!, 'dd MMM yyyy')}</p>
                                <p>
                                   {interest.type}
                                  
                                  
                                </p>
                                <p> {interest.interestRate}</p>
                                <p> {interest.monthsNumber}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={interest.id}
                    loading={loading && target === interest.id} 
                    onClick={(e) => handleInterestDelete(e,interest.id)} 
                    as={Link} to='/interest'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageInterest/${interest.id}`} color='blue' floated='left'>
                    Manage Interest
                </Button>
            </Segment>
        </Segment.Group>
    )
})