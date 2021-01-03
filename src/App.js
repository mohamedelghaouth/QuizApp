import './App.css';
import React, { useState } from 'react';
import {ListGroup} from 'react-bootstrap';

function App() {

  const [selected, setselected] = useState(0);
//test
  const [answer, setanswer] = useState(0);

 
  const [userAnswered, setuserAnswered] = useState(false);


  const changecolor=(position)=>{
     if(userAnswered){
      if(selected === position)
      {
        if(selected === answer)   return 'green';
        return 'red';
      }
      if(answer === position)   return 'green';
     }
            
      return ' ';
  };
  const changeselected=(position)=>{
    setuserAnswered(true);
    setselected(position);
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Question</h1> 
      </header>
      <body className="App-body"> 
        <ListGroup id="ListGroup">
          <ListGroup.Item className={"Item  " + changecolor(0) }  onClick={()=>changeselected(0)}> answezrgthysrtujhszryjsyjr</ListGroup.Item>
          <ListGroup.Item className={"Item " + changecolor(1) }  onClick={()=>changeselected(1)}>answer</ListGroup.Item>
          <ListGroup.Item className={"Item " + changecolor(2) }  onClick={()=>changeselected(2)}>anssjyrjyjwer</ListGroup.Item>
          <ListGroup.Item className={"Item " + changecolor(3) }  onClick={()=>changeselected(3)}> anssrtjhsrtjryjeztykztuykzuèkizeswer</ListGroup.Item>
          {userAnswered? (<ListGroup.Item disabled className='next'>next</ListGroup.Item>):null}
        </ListGroup>
      </body>
    </div>
  );
}

export default App;
