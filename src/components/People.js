import React from 'react'

const People = ({people,deletePeople}) =>{
    return(
        <div>
       
              {people.name}             {people.number}
          <button onClick={() =>deletePeople(people.id, people.name)}>Delete</button>
       </div>)
        
}

export default People;