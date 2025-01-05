import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Item,   Segment} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';




export default observer( function BranchList(){
    const {branchStore} = useStore();
    const {deleteBranch,branchByDate,loading} = branchStore;
    const [target,setTarget] = useState('');

    function handleBanchDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBranch(id);
    }
    
    return(
     

    <Segment>
  
        <Item.Group >
     
            {branchByDate.map(branch =>(

            <Item key={branch.id} >
            <Item.Content>
            <h3>Branch Details</h3>
            <Item.Description>
                <div>{branch.bank}</div>
                <div>{branch.branchNumber}</div>
                <div>{branch.country}</div>
                <div>{branch.city}</div>
                <div>{branch.address}</div>
                
            </Item.Description>
   
          
            <Item.Extra>
            <Button as={Link}  to={`/manageBranch/${branch.id}`} content="Edit" color='blue'/>
                <Button 
                name={branch.id}
                loading={loading && target=== branch.id} onClick={(e) => handleBanchDelete(e,branch.id)} content="Delete"  color='red'/>
              
            </Item.Extra>
            </Item.Content>
            </Item>
                ))}
        </Item.Group>
    </Segment>

    )
  
})
